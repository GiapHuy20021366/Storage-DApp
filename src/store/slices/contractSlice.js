import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FileStorage from "../../abis/FileStorage.json";
import Web3 from "web3";
import { create } from "ipfs-http-client";
import { v4 as uuidv4 } from "uuid";

const ipfsClient = () => {
  if (process.env.REACT_APP_IPFS_NODE === "infura") {
    const auth =
      "Basic " +
      Buffer.from(
        process.env.REACT_APP_IF_API_KEY +
          ":" +
          process.env.REACT_APP_IF_KEY_SECRET
      ).toString("base64");
    return create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
  }
  // Local Node
  return create({
    host: "localhost",
    port: process.env.REACT_APP_IPFS_LOCAL_PORT,
    protocol: "http",
  });
};

const ipfs = ipfsClient();

const contractRef = {
  current: null,
};

const initialState = {
  account: null,
  abi: null,
  address: null,
  files: [],
  isLoaded: false,
  error: null,
};

export const loadContract = createAsyncThunk(
  "file/load",
  async (parameters, { rejectWithValue }) => {
    // Load Web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert("Metamask not found");
      return rejectWithValue("Metamark extension not found!");
    }
    // Load resource
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const networkId = await web3.eth.net.getId();
    const networkData = await FileStorage.networks[networkId];
    if (!networkData) {
      return rejectWithValue("Smart contract not deploy for this network");
    }
    const abi = FileStorage.abi;
    const address = networkData.address;
    const contract = new web3.eth.Contract(abi, address);
    contractRef.current = contract;
    const files = await contract.methods.getFiles().call();
    return {
      account,
      abi,
      address,
      files,
    };
  }
);

export const uploadFile = createAsyncThunk(
  "file/new",
  async (file, { rejectWithValue, getState }) => {
    const { name, buffer, size, type_ } = file;
    if (buffer) {
      let result = await ipfs.add(buffer);
      console.log(result);
      const { account } = getState().contractStorage;
      const contract = contractRef.current;
      const { cid } = result;
      const cidString = cid.toString();
      console.log("CID: ", cidString);
      const time = Date.now();
      const uuid = uuidv4();
      if (contract) {
        try {
          await contract.methods
            .push(name, cidString, size, time, type_, uuid)
            .send({ from: account })
            .then((r) => {
              console.log("Sended: ", r);
            });
        } catch (error) {
          console.log(error);
          return rejectWithValue(error);
        }
      }

      return {
        name: name,
        size: size,
        type_: type_,
        time: time,
        cid: cidString,
        uuid: uuid,
        modify: time,
      };
    }
  }
);

export const renameFile = createAsyncThunk(
  "file/rename",
  async ({ file, newName }, { getState, rejectWithValue }) => {
    const { account } = getState().contractStorage;
    const { uuid } = file;
    const contract = contractRef.current;
    const modify = Date.now();
    if (contract) {
      try {
        await contract.methods
          .renameFile(uuid, newName, modify)
          .send({ from: account })
          .then((r) => {
            console.log("Sended: ", r);
          });
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
    return {
      ...file,
      name: newName,
      modify,
    };
  }
);

export const contractSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadContract.fulfilled, (state, action) => {
      const { account, abi, address, files } = action.payload;
      state.account = account;
      state.abi = abi;
      state.address = address;
      const filesCopy = [...files];
      filesCopy.reverse();
      state.files.push(...filesCopy);
      state.isLoaded = true;
    });
    builder.addCase(loadContract.rejected, (state, action) => {
      throw action.payload;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.files.unshift(action.payload);
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      throw action.payload;
    });

    builder.addCase(renameFile.fulfilled, (state, action) => {
      const fileUpdated = action.payload;
      const files = [...state.files];
      const index = files.find((file) => file.cid === fileUpdated.cid);
      if (index !== -1) {
        files[index] = fileUpdated;
      }
      state.files = state.files.map((file) => {
        if (file.uuid === fileUpdated.uuid) {
          return fileUpdated;
        }
        return file;
      });
      return state;
    });
    builder.addCase(renameFile.rejected, (state, action) => {
      throw action.payload;
    });
  },
});

export default contractSlice.reducer;
