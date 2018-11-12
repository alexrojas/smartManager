// reallyocding.herokuapp.com/api/music_albums

//
// function fetchalbums(){
//   fetch('http://rallycoding.herokuapp.com/api/music_albums')
//   .then((res)=>{
//     res.json()
//     .then((json)=>{
//       console.log(json);
//     })
//   })
//
// }
async function fetchalbums(){
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json  = await res.json()
  console.log(json)

}

fetchalbums()
