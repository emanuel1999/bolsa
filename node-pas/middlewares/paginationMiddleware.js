const pagination = (req, res, next) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
  
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
  
    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    let prevPage = 0;
    if (page == 0) {
      prevPage = "none";
    }
    if (page > 0) {
      prevPage = page - 1;
    }
    
    req.query.page = page
    req.query.size = size
    req.query.prevPage = prevPage


    return next()
  
};

module.exports = { pagination };