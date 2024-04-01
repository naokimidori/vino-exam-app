import COS from 'cos-js-sdk-v5';

export function uploadFileByCos(files: any) {
  return new Promise(resolve => {
    var cos = new COS();

    let uploadFilesData = files.map((item: any) => {
      const file_name = item.name;
      const ramdom = Math.random().toString(36).slice(-8);
      const result_file_name = `topic/${ramdom}_${file_name}`;

      return {
        Bucket: 'vinocos-1259753577' /* 填写自己的 bucket，必须字段 */,
        Region: 'ap-chengdu' /* 存储桶所在地域，必须字段 */,
        Key: result_file_name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
        Body: item.originFileObj, // 上传文件对象
        SliceSize:
          1024 *
          1024 *
          5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
      };
    });

    console.log('uploadFilesData', uploadFilesData);

    cos.uploadFiles(
      {
        files: uploadFilesData,
        SliceSize: 1024 * 1024 * 10,
        onFileFinish: function (err, data, options) {
          console.log(options.Key + '上传' + (err ? '失败' : '完成'));
        },
      },
      async function (err, resData) {
        if (err) {
          console.log('err', err);
        } else {
          console.log('上传成功data', resData);
          const imgUrls = resData.files.map(item => {
            return item?.data?.Location;
          });
          resolve(imgUrls);
        }
      }
    );
  });
}
