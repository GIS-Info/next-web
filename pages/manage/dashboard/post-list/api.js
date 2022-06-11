import axios from 'axios'

export default {
    getData(){
        // axios({
        //     method: 'get',
        //     url: 'https://tenapi.cn/title/?url=https://tenapi.cn',
        // }).then(function(response) {
        //     console.log(99999, response);
        // });
        axios({
            method: 'get',
            url: 'api/post?pageSize = 1',
        }).then(function(response) {
            console.log(99999, response);
        })
    }
}