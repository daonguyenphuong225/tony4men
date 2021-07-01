let arr = ['nam','nam','thai','thai','phuong','phuong','thai']

function count (arr){
    newArr = [...new Set(arr)];
    let array =[]
    let i = 0
   for (data of newArr){
      for (ele of arr){
          if(data == ele){
            i++
          }
      }
      array.push({
          name:data,
          count:i
      })
      i= 0
   }
   console.log(array);
}

count(arr)
