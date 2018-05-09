//run: mongo localhost:27017/association  --shell testDataShell.js
db.dropDatabase();
// ---------------------------------------------   usersaccount   -----------------------------------------------------
db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce4"),
        studentID: "2015210405075",
        pwd: "lXWIi1pDkYw=",  //对应明文密码123456
        email: "714061720@qq.com",
        name: "傅凯琪",
        nickname: null,
        sex: "m",
        admins: [ObjectId("5926b1be5abc0621e218cceb"), ObjectId("5926b1be5abc0621e218cced"), ObjectId("5926b1be5abc0621e218ccee"), ObjectId("5926b1be5abc0621e218ccef")],
        associations: [ObjectId("5926b1be5abc0621e218cceb"), ObjectId("5926b1be5abc0621e218ccec"), ObjectId("5926b1be5abc0621e218cced"), ObjectId("5926b1be5abc0621e218ccee"), ObjectId("5926b1be5abc0621e218ccef")],
        mobile: null,
        headimage: "/web/file/showImg?location=userheadimg&name=2015210405075.jpg",
        createtime: ISODate("2017-05-25T12:00:00.169Z"),
        attendedActivity: []
    });
db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce5"),
        studentID: "2015210405003",
        pwd: "lXWIi1pDkYw=",
        email: "624126503@qq.com",
        name: "徐韬",
        nickname: null,
        sex: "m",
        admins: [ObjectId("5926b1be5abc0621e218ccec"), ObjectId("5926b1be5abc0621e218cceb")],
        associations: [ObjectId("5926b1be5abc0621e218ccec"), ObjectId("5926b1be5abc0621e218cceb")],
        mobile: null,
        headimage: "/web/file/showImg?location=userheadimg&name=2015210405003.jpg",
        createtime: ISODate("2017-05-25T12:00:00.169Z"),
        attendedActivity: []

    });
db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce6"),
        studentID: "2015210405013",
        pwd: "lXWIi1pDkYw=",
        email: "837046740@qq.com",
        name: "岑焕亚",
        nickname: null,
        sex: "f",
        admins: [],
        associations: [],
        mobile: null,
        headimage: "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        createtime: ISODate("2017-05-25T12:00:00.169Z"),
        attendedActivity: []
    });
db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce7"),
        studentID: "2015210405076",
        pwd: "lXWIi1pDkYw=",
        email: "873215214@qq.com",
        name: "韦洁",
        nickname: null,
        sex: "f",
        admins: [],
        associations: [],
        mobile: null,
        headimage: "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        createtime: ISODate("2017-05-25T12:00:00.169Z"),
        attendedActivity: []
    });
db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce8"),
        studentID: "2015210405047",
        pwd: "lXWIi1pDkYw=",
        email: "970716011@qq.com",
        name: "戴雅婕",
        nickname: null,
        sex: "f",
        admins: [],
        associations: [],
        mobile: null,
        headimage: "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        createtime: ISODate("2017-05-25T12:00:00.169Z"),
        attendedActivity: []
    });
db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce9"),
        studentID: "1",
        pwd: "lXWIi1pDkYw=",
        email: null,
        name: "路人甲",
        nickname: null,
        sex: "m",
        admins: [],
        associations: [],
        mobile: null,
        headimage: "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        createtime: ISODate("2017-05-25T12:00:00.169Z"),
        attendedActivity: []
    });
db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccea"),
        studentID: "2",
        pwd: "lXWIi1pDkYw=",
        email: null,
        name: "路人乙",
        nickname: null,
        sex: "m",
        admins: [],
        associations: [],
        mobile: null,
        headimage: "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        createtime: ISODate("2017-05-25T12:00:00.169Z"),
        attendedActivity: []
    });
// ---------------------------------------------   association   -----------------------------------------------------
//三人管一个  魔方社 fkq,xt,cky
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cceb"),
        name: "魔方社",
        proprieterId: ObjectId("5926b1be5abc0621e218cce4"),
        admins: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6")],
        logoimage: "/web/file/showImg?location=clubheadimg&name=2015210405075cube.jpg",
        introduction: "大家一起玩魔方！",
        members: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218ccea")],
        notice: [],
        application: []
    });
//一人管两个 魔方社 桌游社 xt  魔方社交叉
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccec"),
        name: "桌游社",
        proprieterId: ObjectId("5926b1be5abc0621e218cce5"),
        admins: [ObjectId("5926b1be5abc0621e218cce5")],
        members: [ObjectId("5926b1be5abc0621e218cce5")],
        logoimage: "/web/file/showImg?location=clubheadimg&name=2015210405075game.jpg",
        introduction: "大家一起玩桌游！",
        notice: [],
        application: []

    });
//两人管一个 PS社 fkq chy
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cced"),
        name: "PS社",
        proprieterId: ObjectId("5926b1be5abc0621e218cce6"),
        admins: [ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce4")],
        members: [ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce4")],
        logoimage: "/web/file/showImg?location=clubheadimg&name=2015210405075ps.jpg",
        introduction: "大家一起来PS！",
        application: []
    });
//AE社 wj fkq
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccee"),
        name: "AE社",
        proprieterId: ObjectId("5926b1be5abc0621e218cce7"),
        admins: [ObjectId("5926b1be5abc0621e218cce7"), ObjectId("5926b1be5abc0621e218cce4")],
        members: [ObjectId("5926b1be5abc0621e218cce7"), ObjectId("5926b1be5abc0621e218cce4")],
        logoimage: "/web/file/showImg?location=clubheadimg&name=2015210405075ae.jpg",
        introduction: "大家一起做视频！",
        application: []

    });
//读书社 dyj fkq
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccef"),
        name: "读书社",
        proprieterId: ObjectId("5926b1be5abc0621e218cce8"),
        admins: [ObjectId("5926b1be5abc0621e218cce8"), ObjectId("5926b1be5abc0621e218cce4")],
        members: [ObjectId("5926b1be5abc0621e218cce8"), ObjectId("5926b1be5abc0621e218cce4")],
        logoimage: "/web/file/showImg?location=clubheadimg&name=2015210405075read.jpg",
        introduction: "大家一起来看书！",
        application: []
    });
// -----------------------------------------------   activity   -------------------------------------------------------
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccd0"),
        title: "活动1",
        content: "魔方教学活动",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园12-101",
        associationId: ObjectId("5926b1be5abc0621e218cceb"),
        associationName: "魔方社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccd1"),
        title: "活动2",
        content: "UNO!",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园11-101",
        associationId: ObjectId("5926b1be5abc0621e218ccec"),
        associationName: "桌游社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccd2"),
        title: "活动3",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cdd3"),
        title: "活动4",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cdd4"),
        title: "活动5",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cdd5"),
        title: "活动6",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cdd6"),
        title: "活动7",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cdd7"),
        title: "活动8",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cdd8"),
        title: "活动9",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cdd9"),
        title: "活动10",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
db.activity.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cde0"),
        title: "活动11",
        content: "PS教学",
        time: ISODate("2017-05-25T12:00:00.169Z"),
        place: "恕园10-101",
        associationId: ObjectId("5926b1be5abc0621e218cced"),
        associationName: "PS社",
        attendingStudent: [ObjectId("5926b1be5abc0621e218cce4"), ObjectId("5926b1be5abc0621e218cce5"), ObjectId("5926b1be5abc0621e218cce6"), ObjectId("5926b1be5abc0621e218cce7")]
    });
// -------------------------------------------------   news   ---------------------------------------------------------
db.news.insert(
    {
        "_id": ObjectId("5934ebb946a1dd4fa4a83d7a"),
        "title": "aaa啦啦啦",
        "content": "<p>aaaaadadsad<span style=\"color: rgb(255, 0, 0);\">wqeqea</span>das<br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test1.jpeg",
        "time": ISODate("2017-06-05T05:27:21.790Z"),
        "__v": 0.0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ebc346a1dd4fa4a83d7b"),
        "title": "bbb",
        "content": "<p>bbbb</p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test2.jpg",
        "time": ISODate("2017-06-05T05:27:31.092Z"),
        "__v": 0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ebcd46a1dd4fa4a83d7c"),
        "title": "ccc",
        "content": "<p>cccc<br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test3.jpeg",
        "time": ISODate("2017-06-05T05:27:41.556Z"),
        "__v": 0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ebd646a1dd4fa4a83d7d"),
        "title": "ddd",
        "content": "<p>dddd</p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test4.jpg",
        "time": ISODate("2017-06-05T05:27:50.636Z"),
        "__v": 0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ebde46a1dd4fa4a83d7e"),
        "title": "eee",
        "content": "<p>eeee</p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test5.jpg",
        "time": ISODate("2017-06-05T05:27:58.610Z"),
        "__v": 0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ebed46a1dd4fa4a83d7f"),
        "title": "fff",
        "content": "<p>ffff</p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test6.jpg",
        "time": ISODate("2017-06-05T05:28:13.201Z"),
        "__v": 0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ebf746a1dd4fa4a83d80"),
        "title": "ggg",
        "content": "<p>gggg</p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test7.jpg",
        "time": ISODate("2017-06-05T05:28:23.069Z"),
        "__v": 0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ebff46a1dd4fa4a83d81"),
        "title": "hhh",
        "content": "<p>hhhh</p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test8.jpg",
        "time": ISODate("2017-06-05T05:28:31.764Z"),
        "__v": 0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ec0746a1dd4fa4a83d82"),
        "title": "iii",
        "content": "<p>iiii</p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test9.jpg",
        "time": ISODate("2017-06-05T05:28:39.936Z"),
        "__v": 0
    });
db.news.insert(
    {
        "_id": ObjectId("5934ec1146a1dd4fa4a83d83"),
        "title": "jjj",
        "content": "<p>jjjj</p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-5test10.jpeg",
        "time": ISODate("2017-06-05T05:28:49.583Z"),
        "__v": 0
    });

// -------------------------------------------------   file   ---------------------------------------------------------
db.file.insert(
    {
        "_id": ObjectId("5935028adaa8a34b10e069b4"),
        "title": "aaa.txt",
        "content": "来了来了",
        "url": "upload/file/5926b1be5abc0621e218ccebaaa.txt",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "time": ISODate("2017-06-05T07:04:42.591Z"),
        "__v": 0
    });
db.file.insert(
    {
        "_id": ObjectId("593503ffdaa8a34b10e069b5"),
        "title": "bbb.txt",
        "content": "暗示法萨芬收社费扫二维",
        "url": "upload/file/5926b1be5abc0621e218ccebbbb.txt",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "time": ISODate("2017-06-05T07:10:55.765Z"),
        "__v": 0
    });