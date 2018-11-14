module.exports={
  port:process.env.PORT|| 3000,
  mlab_host:process.env.MLAB_HOST||'https://api.mlab.com/api/1/databases/',
  mlab_db:process.env.MLAB_DB||'colapi_gamd/',
  mlab_key:process.env.MLAB_KEY||'apiKey=B7MjpzWQ-YUoiPGR-u5aEQrbk7Q0_MaT',
  mlab_collection_user:process.env.MLAB_COLLECTION_USER||'user',
  mlab_collection_account:process.env.MLAB_COLLECTION_ACCOUNT||'account',
  mlab_collection_movieent:process.env.MLAB_COLLECTION_MOVIEENT||'movieent',
  URLbase:process.env.URL_BASE||'/colapi/v0/',
  SECRET_TOKEN:'TechU2017'
}
