import axios from "axios";

const skydropxApi = axios.create({
  baseURL: 'https://api-demo.skydropx.com/v1',
  headers:{
    'Authorization': 'Bearer Fk09kz3ivwbM4sImxQbgd8AGekxAncWWghk4Otv2fiYt'
  }
})

export default skydropxApi