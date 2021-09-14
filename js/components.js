window.onload=function(){
  var app = new Vue({
    el: '#app',
    data: {
      date:"",
      text:"",
      searchName:"",
      goodsList:[
        {
            name: "qui",
            price: 26,
            count: 5,
            label: "pet food",
            date: {
              year: 2018,
              day: "14/1"
            }
          },
          {
            name: "dolor",
            price: 22,
            count: 9,
            label: "clothes",
            date: {
              year: 2017,
              day: "9/2"
            }
          },
          {
            name: "mollit",
            price: 20,
            count: 6,
            label: "electronics",
            date: {
              year: 2017,
              day: "16/10"
            }
          },
          {
            name: "tempor",
            price: 26,
            count: 5,
            label: "toys",
            date: {
              year: 2022,
              day: "11/4"
            }
          },
          {
            name: "consequat",
            price: 33,
            count: 3,
            label: "furniture products",
            date: {
              year: 2017,
              day: "27/2"
            }
          },
          {
            name: "aute",
            price: 28,
            count: 2,
            label: "other",
            date: {
              year: 2022,
              day: "8/5"
            }
          },
          {
            name: "irure",
            price: 26,
            count: 2,
            label: "toys",
            date: {
              year: 2021,
              day: "26/2"
            }
          },
          {
            name: "nulla",
            price: 34,
            count: 2,
            label: "food",
            date: {
              year: 2021,
              day: "13/4"
            }
          },
          {
            name: "consequat",
            price: 37,
            count: 8,
            label: "food",
            date: {
              year: 2022,
              day: "29/5"
            }
          },
          {
            name: "duis",
            price: 25,
            count: 4,
            label: "fruits",
            date: {
              year: 2020,
              day: "23/8"
            }
          },
          {
            name: "mollit",
            price: 40,
            count: 3,
            label: "fruits",
            date: {
              year: 2017,
              day: "21/8"
            }
          },
          {
            name: "in",
            price: 26,
            count: 7,
            label: "toys",
            date: {
              year: 2020,
              day: "4/2"
            }
          },
          {
            name: "labore",
            price: 33,
            count: 3,
            label: "fruits",
            date: {
              year: 2020,
              day: "26/2"
            }
          },
          {
            name: "sit",
            price: 28,
            count: 5,
            label: "furniture products",
            date: {
              year: 2020,
              day: "7/11"
            }
          },
          {
            name: "cillum",
            price: 25,
            count: 10,
            label: "clothes",
            date: {
              year: 2021,
              day: "8/4"
            }
          }
      ],
      goodsShow:[],
      user:"user",
      total:0,
      cartItem:[],
      goodName:'',
      goodDate:'',
      goodCount:'',
      type:'',
      goodPrice:'',
      goodsType:[
        'fruits',
        'vegetables',
        'food',
        'pet food',
        'toys',
        'electronics',
        'furniture products',
        'clothes',
        'other',
      ],
      pop:true,
      yearSet:'',
      yearAll:[]
    },
    mounted(){
        this.getDate();
        this.getText();
        this.getStart();
    },
    computed:{
        totalprice(){
          if(this.cartItem != null){
            let total = 0
            this.cartItem.forEach(v=>{
              total+=v.price*v.count
            })
            return total
          }else{
            this.cartItem = []
          }
          
        }
      },
    watch:{
        cartItem:{
            handler(){
                window.localStorage.setItem('cart',JSON.stringify(this.cartItem))
            },
            deep:true
        },
        yearSet:{
            handler(){
                this.getUpDate()
            },
            deep:true
        }
    },
    methods:{
        getDate(){
            let t = new Date();
            let d = (t.getDate()).toString();
            let m = (t.getMonth()).toString();
            let y = (t.getFullYear()).toString();
            this.date = d+"/"+ m+"/" + y
        },
        getText(){
            this.text="Need to buy goods today is"
        },
        getStart(){
            function unique(arr){
                return Array.from(new Set(arr)); 
            }
            let y = this.goodsList.map(goodsLists => goodsLists.date.year);
            let arr = unique(y);
            let news='';
            for(let i=0;i<arr.length;i++){
              for(let j=0;j<arr.length-i;j++){
                if(arr[j]<arr[j+1]){
                  news = arr[j];
                  arr[j] = arr[j+1];
                  arr[j+1] = news;
                }
              }
            }
            this.yearAll = arr;
            this.getUpDate();
        },
        add(){
            console.log(this.goodDate)
            let yearNew = parseInt(this.goodDate.slice(0,4))
            let dayNew = this.goodDate.slice(5,7) + "/" + this.goodDate.slice(8,10)
            this.goodsList.push({
                name:this.goodName,
                price:this.goodPrice,
                count:this.goodCount,
                label:this.type,
                date:{
                    year:yearNew,
                    day:dayNew
                }
            })
            this.goodName=''
            this.goodDate=''
            this.goodCount=''
            this.type=''
            this.goodPrice=''
            this.pop=true
            this.getUpDate()
        },
        search(){
            let s = this.searchName;
            this.getUpDate(s)
        },
        getUpDate(name){
            if(name==""){
                if(this.yearSet=='all'||this.yearSet==""){
                    this.goodsShow = this.yearAll.map(year => {
                        let i={year:year,goods:[]}
                        i.goods = this.goodsList.filter(goodsLists => goodsLists.date.year == year)
                        return i
                    })
                }else{
                    let i=[{year:this.yearSet,goods:[]}]
                    i[0].goods = this.goodsList.filter(goodsLists => goodsLists.date.year == this.yearSet)
                    this.goodsShow =  i 
                }
            }else{
                let goodName = this.goodsList.filter(goodsLists => 
                    goodsLists.name.search(name) !== -1
                )
                if(this.yearSet=='all'||this.yearSet==""){
                    this.goodsShow = this.yearAll.map(year => {
                        let i={year:year,goods:[]}
                        i.goods = goodName.filter(goodsLists => goodsLists.date.year == year)
                        return i
                    })
                }else{
                    let i=[{year:this.yearSet,goods:[]}]
                    i[0].goods = goodName.filter(goodsLists => goodsLists.date.year == this.yearSet)
                    this.goodsShow =  i 
                }
            }
            

        },
        clear(){
            this.cartItem=[]
        },
        addcount(index){
            this.cartItem[index].count++
        },
        reduce(index){
            if(this.cartItem[index].count>1){
            this.cartItem[index].count--
            }else{
            this.cartItem.splice(index,1)
            }
        },
        addtochart(item){
            let goods =  this.goodsList.filter(goodsLists => goodsLists.name == item)
            let result = this.cartItem.find(v=>v.name == goods[0].name)
            if(result){
                result.count+=1
              }else{
                this.cartItem.push({
                    name:goods[0].name,
                    count:1,
                    price:goods[0].price,
                })
              }
            
        },
      
    },
    created(){
        this.cartItem = JSON.parse(window.localStorage.getItem('cart',JSON.stringify(this.cartItem)))
      }
  })
}
