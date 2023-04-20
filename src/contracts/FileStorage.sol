pragma solidity >=0.4.21 <=0.8.19;
pragma experimental ABIEncoderV2;

contract FileStorage {
    struct File {
        string name;
        string cid;
        uint256 size;
        uint256 time;
        string type_;
        uint256 modify;
        string uuid;
    }

    File[] public files;
    mapping(string => File) cid2File;
    mapping(string => bool) isCIDExists;
    mapping(string => uint256) cid2Index;
    mapping(string => uint256) uuid2Index;

    function push(
        string memory name,
        string memory cid,
        uint256 size,
        uint256 time,
        string memory type_,
        string memory uuid
    ) public returns (File memory) {
        File memory newFile = File(name, cid, size, time, type_, time, uuid);
        files.push(newFile);
        cid2File[cid] = newFile;
        isCIDExists[cid] = true;
        cid2Index[cid] = files.length - 1;
        uuid2Index[uuid] = files.length - 1;
        return newFile;
    }

    function renameFile(
        string memory cid,
        string memory newName,
        uint256 modify
    ) public returns (File memory) {
        uint256 index = uuid2Index[cid];
        File storage file = files[index];
        file.name = newName;
        file.modify = modify;
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
