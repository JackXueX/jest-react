const mockUndoList = {
  data: [{
    status: 'div',
    value: 'dell lee'
  }],
  success: true
}; 

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get(url) {
    if (url === '/undoList.json') {
      return new Promise((resolve) => {
        resolve(mockUndoList);
      })
    }
  }
}