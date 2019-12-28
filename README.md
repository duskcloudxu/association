# AssociationsOnline! 
Association management system

[![](https://img.shields.io/badge/nodejs-6.10.0-green.svg)](https://github.com/nodejs/node)
[![](https://img.shields.io/badge/angularjs-1.6.4-blue.svg)](https://github.com/angular/angular.js/)
[![](https://img.shields.io/badge/angular--ui--router-0.4.2-6efff0.svg)](https://github.com/angular-ui/ui-router/)
[![](https://img.shields.io/badge/mongodb-3.2.11-brightgreen.svg)](https://github.com/mongodb/mongo)
[![](https://img.shields.io/badge/express-4.14.1-adfeac.svg)](https://github.com/expressjs/express)
[![](https://img.shields.io/badge/sweetalert-1.0.0-aaedfd.svg)](https://github.com/t4t5/sweetalert)
[![](https://img.shields.io/badge/mongoose-4.7.8-ffeeff.svg)](https://github.com/Automattic/mongoose)


### Description

　　This is an association management website designed for visiting from PC, including features like personal message, activity posting and event RSVP, association application and public document uploading and downloading.  
　　It's based on MEAN tech stack.

### User Roles and Permission
1. Association Moderator
    - event
        - post event
            - for association members only
            - for everyone
        - look up people who RSVPed
        - event discussion
    - association main page
        - association videos
        - previous events
        - new member application
    - member management
    - association documents
        - upload
        - download
    
1. members
    - event
        - event RSVP
        - event discussion 
    - personal page
        - look all attending association
        - my application status
    
    
### ER diagram
models
1. UserAccount
    - studentID: String,                          
    - pwd: String,                               
    - email: String,                             
    - name: String,                                
    - nickname: String,                           
    - sex: String,                                
    - admins: [ObjectId],                        
    - associations: [ObjectId],                  
    - mobile: String,                             
    - headimage: String,                        
    - createtime: {type: Date, default: Date.now}, 
    - attendedActivity:[{                         
    - 　　type: ObjectId,
    - 　　unique:true
    - }]
1. Association
    - name: String,          
    - proprieterId: ObjectId,
    - admins: [ObjectId],   
    - members:[ObjectId],    
    - logoimage: String,     
    - introduction: String,  
    - application:[{
    - 　　statement:String,
    - 　　memberId:ObjectId
    - }]
1. Activity
    - title: String,           
    - content: String,        
    - time: Date,              
    - place: String,          
    - associationId: ObjectId, 
    - associationName: String, 
    - attendingStudent:[{       
    - 　　type: ObjectId,
    - 　　unique:true
    - }]
1. News
    - title: String,          
    - content: String,        
    - time: {                 
    - 　　type: Date,
    - 　　default:Date.now
    - },
    - associationId: ObjectId,
    - imgSrc: String,         
1. File
    - 12
    - title: String,         
    - content: String,       
    - url:String,            
    - time: {                
    - 　　type: Date,
    - 　　default:Date.now
    - },
    - associationId: ObjectId,
### Preview
Sign in 
![登陆](docs/page-design/login.jpg)
![注册](docs/page-design/register.jpg)
![主界面-活动列表](docs/page-design/home-activity.jpg)
![主界面-社团介绍列表](docs/page-design/home-intro.jpg)
![用户主页](docs/page-design/user-profile.jpg)

![用户加入的社团及活动](docs/page-design/user-act-ass.jpg)
![社团活动管理](docs/page-design/admin-act.jpg)
![社团新闻管理](docs/page-design/admin-news.jpg)
![社团社员管理](docs/page-design/admin-member.jpg)
![社团主页](docs/page-design/clubhome.jpg)
![活动详情](docs/page-design/act-info.jpg)
![活动编辑](docs/page-design/act-edit.jpg)
![新闻编辑](docs/page-design/news-edit.jpg)
