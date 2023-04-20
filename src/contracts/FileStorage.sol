pragma solidity >=0.4.21 <=0.8.19;
pragma experimental ABIEncoderV2;

contract FileStorage {
    struct File {
        string name;
        string cid;
        uint256 size;
        uint256 time;
        string type_;
    }

    File[] public files;
    mapping(string => File) cid2File;
    mapping(string => bool) isCIDExists;
    mapping(string => uint256) cid2Index;

    function push(
        string memory name,
        string memory cid,
        uint256 size,
        uint256 time,
        string memory type_
    ) public returns (File memory) {
        File memory newFile = File(name, cid, size, time, type_);
        files.push(newFile);
        cid2File[cid] = newFile;
        isCIDExists[cid] = true;
        cid2Index[cid] = files.length - 1;
        // addDataToMapping(newFile);
        return newFile;
    }

    function renameFile(
        string memory cid,
        string memory newName
    ) public returns (File memory) {
        uint256 index = cid2Index[cid];
        File storage file = files[index];
        file.name = newName;
        files[index] = file;
        return file;
    }

    function isCIDExisted(string memory cid) public view returns (bool) {
        return isCIDExists[cid];
    }

    function addDataToMapping(File memory file) public {
        cid2File[file.cid] = file;
    }

    function getFiles() public view returns (File[] memory) {
        return files;
    }

    // Read Func
    function getByCid(string memory cid) public view returns (File memory) {
        return cid2File[cid];
    }
}
