

// const multer = require('@koa/multer')

// const uploadAvatar = multer({
//     dest:'/uploads'
// })

// const handleAvatar = uploadAvatar.single('avatar')

// module.exports = {
//     handleAvatar
// }

//上面代码没有写入文件夹权限



const path = require('path');
const fs = require('fs');
const os = require('os');
const multer = require('@koa/multer');
const {UPLOAD_DIR} = require('../config/path')

// 创建安全上传目录
const createUploadDir = () => {
  // 开发环境用项目目录，生产环境用系统临时目录
  const baseDir = process.env.NODE_ENV === 'production' 
    ? os.tmpdir() 
    : process.cwd();
  
  const uploadDir = path.join(baseDir, UPLOAD_DIR);
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
  }
  
  return uploadDir;
};

const uploadAvatar = multer({
  dest: createUploadDir(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB限制
    files: 1
  }
});

const handleAvatar = uploadAvatar.single('avatar');

module.exports = {
  handleAvatar
};