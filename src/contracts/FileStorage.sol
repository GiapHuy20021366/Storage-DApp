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

    function push(
        string memory name,
        string memory cid,
        uint256 size,
        uint256 time,
        string memory type_
    ) public returns (File memory) {
        if (isCIDExists[cid]) {
            revert();
        }
        File memory newFile = File(name, cid, size, time, type_);
        files.push(newFile);
        addDataToMapping(newFile);
        isCIDExists[cid] = true;
        return newFile;
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
