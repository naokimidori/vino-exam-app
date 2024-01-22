// 模拟的服务端数据
const serverData = [
  { id: 1, status: 'Progress' },
  { id: 2, status: 'Completed' },
  { id: 3, status: 'Completed' },
  { id: 4, status: 'Completed' },
  { id: 5, status: 'Progress' },
  { id: 6, status: 'Progress' },
  { id: 7, status: 'Completed' },
  { id: 8, status: 'Completed' },
  { id: 9, status: 'Progress' },
  { id: 10, status: 'Completed' },
  { id: 11, status: 'Progress' },
  { id: 12, status: 'Completed' },
  { id: 13, status: 'Completed' },
  { id: 14, status: 'Completed' },
  { id: 15, status: 'Progress' },
  { id: 16, status: 'Completed' },
  { id: 17, status: 'Progress' },
  { id: 18, status: 'Completed' },
  { id: 19, status: 'Completed' },
  { id: 20, status: 'Progress' }
];

// 模拟异步请求数据的函数
function fetchDataFromServer(pageNum: number, pageSize: number) {
  console.log('query param', pageNum, pageSize);

  // 模拟异步请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(serverData);
    }, 500); // 模拟500毫秒的网络延迟
  });
}

// 分页请求方法
export async function getPagedData(pageNum = 1, pageSize = 20) {
  let allData: any[] = [];
  let currentPage = pageNum;

  while (allData.length < pageSize) {
    // 请求数据
    const dataChunk: any = await fetchDataFromServer(currentPage, pageSize);

    // 过滤掉状态为“进行中”的数据
    const filteredData = dataChunk.filter((item: { status: string; }) => item.status !== 'Progress');

    // 将过滤后的数据添加到总数据列表中
    allData = allData.concat(filteredData);

    // 增加当前页数
    currentPage++;
  }

  return allData;
}