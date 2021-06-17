# rest_api
testing

npm start

endpoints('/'-home,
          '/posts'-posts)
GET
    Response DATA{_id:String,
                   title:String,
                   content:String,
                   date: date(default)}
    Sorted 
POST
    Request DATA{title:string,
                 content:string}
PUT(/posts/:id)
    Request DATA{title:string,
                 content:string}
DELETE(/posts/:id)
     Response DATA result of requst
