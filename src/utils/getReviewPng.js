const getUri = (file) => {
  const gateways = {
    local: process.env.REACT_APP_IPFS_LOCAL_GATEWAY,
    infura: process.env.REACT_APP_IF_DEDICATED_GATEWAY,
  };

  const gateway = gateways[process.env.REACT_APP_IPFS_NODE];

  if (!file) {
    return "/images/File_Nothing.jpg";
  }
  if (file.type_.startsWith("video/")) {
    return "/images/Video_File.png";
  }
  if (file.type_.startsWith("image/")) {
    return `${gateway}/ipfs/${file.cid}`;
  }
  if (file.type_.startsWith("application/pdf")) {
    return "/images/Pdf_File.png";
  }
  return "/images/File_Nothing.jpg";
};

module.exports = {
  getUri,
};
