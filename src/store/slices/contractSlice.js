import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FileStorage from "../../abis/FileStorage.json";
import Web3 from "web3";
import { create } from "ipfs-http-client";

const auth =
  "Basic " +
  Buffer.from(
    process.env.REACT_APP_IF_API_KEY + ":" + process.env.REACT_APP_IF_KEY_SECRET
  ).toString("base64");

console.log(auth);
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

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
    const { name, buffer, size, type } = file;
    if (buffer) {
      let result = await ipfs.add(buffer);
      console.log(result);
      const { account } = getState().contractStorage;
      const contract = contractRef.current;
      const { cid } = result;
      const cidString = cid.toString();
      const ipfsPath = `${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${cidString}`;
      console.log(ipfsPath);
      const time = Date.now();
      if (contract) {
        try {
          contract.methods
            .push(name, cidString, size, time, type)
            .send({ from: account })
            .then((r) => {
              console.log("Sended: ", r);
            });
        } catch (error) {
          console.log(error);
        }
      }
      console.log("asdak");

      return {
        name: name,
        size: size,
        type: type,
        time: time,
        cid: cidString,
      };
    }
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
      state.files.push(...files);
      state.isLoaded = true;
    });
    builder.addCase(loadContract.rejected, (state, action) => {
      throw action.payload;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.files.push(action.payload);
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default contractSlice.reducer;