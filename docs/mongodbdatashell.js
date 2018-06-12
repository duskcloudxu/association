//run: mongo localhost:27017/association  --shell mongodbdatashell.js
db.dropDatabase();

// ---------------------------------------------   usersaccount   -----------------------------------------------------
db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce4"),
        "studentID": "2015210405075",
        "pwd": "lXWIi1pDkYw=",
        "email": "714061720@qq.com",
        "name": "傅凯琪",
        "nickname": null,
        "sex": "m",
        "admins": [
            ObjectId("5926b1be5abc0621e218cceb"),
            ObjectId("5926b1be5abc0621e218cced"),
            ObjectId("5926b1be5abc0621e218ccee"),
            ObjectId("5926b1be5abc0621e218ccef")
        ],
        "associations": [
            ObjectId("5926b1be5abc0621e218cceb"),
            ObjectId("5926b1be5abc0621e218ccec"),
            ObjectId("5926b1be5abc0621e218cced"),
            ObjectId("5926b1be5abc0621e218ccee"),
            ObjectId("5926b1be5abc0621e218ccef")
        ],
        "mobile": null,
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405075.jpg",
        "createtime": ISODate("2017-05-25T12:00:00.169Z"),
        "attendedActivity": []
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce5"),
        "studentID": "2015210405003",
        "pwd": "lXWIi1pDkYw=",
        "email": "624126503@qq.com",
        "name": "徐韬",
        "nickname": null,
        "sex": "m",
        "admins": [
            ObjectId("5926b1be5abc0621e218ccec"),
            ObjectId("5926b1be5abc0621e218cceb")
        ],
        "associations": [
            ObjectId("5926b1be5abc0621e218ccec"),
            ObjectId("5926b1be5abc0621e218cceb")
        ],
        "mobile": null,
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405003.jpg",
        "createtime": ISODate("2017-05-25T12:00:00.169Z"),
        "attendedActivity": []
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce6"),
        "studentID": "2015210405013",
        "pwd": "lXWIi1pDkYw=",
        "email": "837046740@qq.com",
        "name": "岑焕亚",
        "nickname": null,
        "sex": "f",
        "admins": [],
        "associations": [],
        "mobile": null,
        "headimage": "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        "createtime": ISODate("2017-05-25T12:00:00.169Z"),
        "attendedActivity": []
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce7"),
        "studentID": "2015210405076",
        "pwd": "lXWIi1pDkYw=",
        "email": "873215214@qq.com",
        "name": "韦洁",
        "nickname": null,
        "sex": "f",
        "admins": [],
        "associations": [],
        "mobile": null,
        "headimage": "/web/file/showImg?location=userheadimg&name=201521040507633D9392E4590031016C4EF7A3BCA2209.png",
        "createtime": ISODate("2017-05-25T12:00:00.169Z"),
        "attendedActivity": []
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce8"),
        "studentID": "2015210405047",
        "pwd": "lXWIi1pDkYw=",
        "email": "970716011@qq.com",
        "name": "戴雅婕",
        "nickname": null,
        "sex": "f",
        "admins": [],
        "associations": [],
        "mobile": null,
        "headimage": "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        "createtime": ISODate("2017-05-25T12:00:00.169Z"),
        "attendedActivity": []
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cce9"),
        "studentID": "1",
        "pwd": "lXWIi1pDkYw=",
        "email": null,
        "name": "路人甲",
        "nickname": null,
        "sex": "m",
        "admins": [],
        "associations": [],
        "mobile": null,
        "headimage": "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        "createtime": ISODate("2017-05-25T12:00:00.169Z"),
        "attendedActivity": []
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccea"),
        "studentID": "2",
        "pwd": "lXWIi1pDkYw=",
        "email": null,
        "name": "路人乙",
        "nickname": null,
        "sex": "m",
        "admins": [],
        "associations": [],
        "mobile": null,
        "headimage": "/web/file/showImg?location=userheadimg&name=user-default-head.jpg",
        "createtime": ISODate("2017-05-25T12:00:00.169Z"),
        "attendedActivity": []
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937f7c6e98de4205c99111e"),
        "studentID": "2015210405041",
        "email": "2015210405@qq.com",
        "nickname": "荆轲",
        "name": "荆轲",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405041荆轲.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T12:55:34.998Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cced")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fa825be0831bd4807a3a"),
        "studentID": "2015210405042",
        "nickname": "后羿",
        "name": "后羿",
        "email": "2015210405@qq.com",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405042后羿.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:07:14.480Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cceb"),
            ObjectId("5926b1be5abc0621e218cceb"),
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fba9ae425317008e5d53"),
        "studentID": "2015210405043",
        "email": "2015210405@qq.com",
        "nickname": "貂蝉",
        "name": "貂蝉",
        "sex": "female",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405043貂蝉.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:12:09.660Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cceb"),
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fc58e104b51f143b0180"),
        "studentID": "2015210405044",
        "email": "2015210405@qq.com",
        "nickname": "东皇太一",
        "name": "东皇太一",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405044东皇太一jpg.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:15:04.491Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cceb"),
            ObjectId("5926b1be5abc0621e218cceb")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fcb4e104b51f143b0181"),
        "studentID": "2015210405045",
        "email": "2015210405@qq.com",
        "nickname": "曹操",
        "name": "曹操",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405045曹操.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:16:36.806Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cced"),
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fcdae104b51f143b0182"),
        "studentID": "2015210405046",
        "nickname": "诸葛亮",
        "name": "诸葛亮",
        "email": "2015210405@qq.com",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405046诸葛亮.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:17:14.108Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cceb")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fd31e104b51f143b0183"),
        "studentID": "2015210405048",
        "email": "2015210405@qq.com",
        "nickname": "大乔",
        "name": "大乔",
        "sex": "female",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405048大乔.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:18:41.023Z"),
        "associations": [],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fd58e104b51f143b0184"),
        "studentID": "2015210405049",
        "email": "2015210405@qq.com",
        "nickname": "孙尚香",
        "name": "孙尚香",
        "sex": "female",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405049孙尚香.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:19:20.384Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cceb"),
            ObjectId("5926b1be5abc0621e218cced"),
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fd7ce104b51f143b0185"),
        "studentID": "2015210405050",
        "email": "2015210405@qq.com",
        "nickname": "小乔",
        "name": "小乔",
        "sex": "female",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405050小乔.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:19:56.045Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cced"),
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fda2e104b51f143b0186"),
        "studentID": "2015210405052",
        "nickname": "墨子",
        "name": "墨子",
        "sex": "male",
        "mobile": "20152104050",
        "email": "2015210405@qq.com",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405052墨子.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:20:34.593Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cced")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937f5c93285cf3770ef71ed"),
        "studentID": "2015210405065",
        "email": "2015210405@qq.com",
        "nickname": "老夫子",
        "name": "老夫子",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405065老夫子.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T12:47:05.315Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937f81da15c2219f09f5dac"),
        "studentID": "2015210405062",
        "email": "2015210405@qq.com",
        "nickname": "姜子牙",
        "name": "姜子牙",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405062姜子牙.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T12:57:01.879Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937f96c20983a2908dcc961"),
        "studentID": "2015210405061",
        "email": "2015210405@qq.com",
        "nickname": "孙膑",
        "name": "孙膑",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405061孙膑.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:02:36.806Z"),
        "associations": [],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fa01be67ac0674f2643e"),
        "studentID": "2015210405060",
        "email": "2015210405@qq.com",
        "nickname": "马可波罗",
        "name": "马可波罗",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405060马可波罗.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:05:05.217Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cced"),
            ObjectId("5926b1be5abc0621e218ccee"),
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937faa6244047041038c839"),
        "studentID": "2015210405059",
        "email": "2015210405@qq.com",
        "nickname": "李元芳",
        "name": "李元芳",
        "sex": "female",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405059李元芳.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:07:50.105Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cced"),
            ObjectId("5926b1be5abc0621e218ccee"),
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fb0ea79abd01d8265737"),
        "studentID": "2015210405057",
        "email": "2015210405@qq.com",
        "nickname": "孙悟空",
        "name": "孙悟空",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405057孙悟空.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:09:34.152Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fcc5a79abd01d8265738"),
        "studentID": "2015210405056",
        "email": "2015210405@qq.com",
        "nickname": "花木兰",
        "name": "花木兰",
        "sex": "female",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405056相遇.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:16:53.752Z"),
        "associations": [],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fd4ea79abd01d8265739"),
        "studentID": "2015210405055",
        "email": "2015210405@qq.com",
        "nickname": "芈月",
        "name": "芈月",
        "sex": "female",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405055芈月.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:19:10.394Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218cced"),
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fd80a79abd01d826573a"),
        "studentID": "2015210405054",
        "email": "2015210405@qq.com",
        "nickname": "虞姬",
        "name": "虞姬",
        "sex": "female",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405054虞姬.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:20:00.721Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });

db.usersaccount.insert(
    {
        "_id": ObjectId("5937fdafa79abd01d826573b"),
        "studentID": "2015210405053",
        "email": "2015210405@qq.com",
        "nickname": "钟馗",
        "name": "钟馗",
        "sex": "male",
        "mobile": "20152104050",
        "headimage": "/web/file/showImg?location=userheadimg&name=2015210405053钟馗.jpg",
        "pwd": "g5evxxtFSnM=",
        "attendedActivity": [],
        "createtime": ISODate("2017-06-07T13:20:47.445Z"),
        "associations": [
            ObjectId("5926b1be5abc0621e218ccee")
        ],
        "admins": [],
        "__v": 0
    });


// ---------------------------------------------   association   -----------------------------------------------------
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cceb"),
        "name": "魔方社",
        "imgSrc": "/web/file/showImg?location=associationimg&name=mf.jpg",
        "proprieterId": ObjectId("5926b1be5abc0621e218cce4"),
        "admins": [
            ObjectId("5926b1be5abc0621e218cce4"),
            ObjectId("5926b1be5abc0621e218cce5"),
            ObjectId("5926b1be5abc0621e218cce6")
        ],
        "logoimage": "/web/file/showImg?location=clubheadimg&name=2015210405075cube.jpg",
        "introduction": "大家一起玩魔方！",
        "members": [
            ObjectId("5926b1be5abc0621e218cce4"),
            ObjectId("5926b1be5abc0621e218cce5"),
            ObjectId("5926b1be5abc0621e218cce6"),
            ObjectId("5926b1be5abc0621e218ccea"),
            ObjectId("5937fa825be0831bd4807a3a"),
            ObjectId("5937fba9ae425317008e5d53"),
            ObjectId("5937fc58e104b51f143b0180"),
            ObjectId("5937fcdae104b51f143b0182"),
            ObjectId("5937fd58e104b51f143b0184")
        ],
        "notice": [],
        "application": [
            {
                "memberId": ObjectId("5937f384faf14d1fd4d05ce2"),
                "statement": "3",
                "_id": ObjectId("5937f693e98de4205c99111c")
            },
            {
                "memberId": ObjectId("5937fcb4e104b51f143b0181"),
                "statement": "5",
                "_id": ObjectId("59380a4e33bc5037e41136c3")
            },
            {
                "memberId": ObjectId("5937fd31e104b51f143b0183"),
                "statement": "7",
                "_id": ObjectId("59380b5b33bc5037e41136c7")
            },
            {
                "memberId": ObjectId("5937fcc5a79abd01d8265738"),
                "statement": "请输入申请理由14",
                "_id": ObjectId("59380e4f33bc5037e41136db")
            },
            {
                "memberId": ObjectId("5937fa01be67ac0674f2643e"),
                "statement": "请输入申请理由17",
                "_id": ObjectId("59380f2f33bc5037e41136e4")
            },
            {
                "memberId": ObjectId("5937f5c93285cf3770ef71ed"),
                "statement": "请输入申请理由20",
                "_id": ObjectId("5938106a33bc5037e41136f0")
            }
        ]
    });
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccec"),
        "name": "桌游社",
        "imgSrc": "/web/file/showImg?location=associationimg&name=zy.jpg",
        "proprieterId": ObjectId("5926b1be5abc0621e218cce5"),
        "admins": [
            ObjectId("5926b1be5abc0621e218cce5")
        ],
        "members": [
            ObjectId("5926b1be5abc0621e218cce5")
        ],
        "logoimage": "/web/file/showImg?location=clubheadimg&name=2015210405075game.jpg",
        "introduction": "大家一起玩桌游！",
        "notice": [],
        "application": [
            {
                "memberId": ObjectId("5937f7c6e98de4205c99111e"),
                "statement": "1",
                "_id": ObjectId("5937f8373250de2c242ed949")
            },
            {
                "memberId": ObjectId("5937fc58e104b51f143b0180"),
                "statement": "4",
                "_id": ObjectId("5938099833bc5037e41136bf")
            },
            {
                "memberId": ObjectId("5937fcdae104b51f143b0182"),
                "statement": "6",
                "_id": ObjectId("59380ab433bc5037e41136c6")
            },
            {
                "memberId": ObjectId("5937fd31e104b51f143b0183"),
                "statement": "7",
                "_id": ObjectId("59380b7a33bc5037e41136c9")
            },
            {
                "memberId": ObjectId("5937fdafa79abd01d826573b"),
                "statement": "请输入申请理由11",
                "_id": ObjectId("59380d5133bc5037e41136d2")
            },
            {
                "memberId": ObjectId("5937fd80a79abd01d826573a"),
                "statement": "请输入申请理由12",
                "_id": ObjectId("59380dc633bc5037e41136d5")
            },
            {
                "memberId": ObjectId("5937fcc5a79abd01d8265738"),
                "statement": "请输入申请理由14",
                "_id": ObjectId("59380e6933bc5037e41136dd")
            },
            {
                "memberId": ObjectId("5937fb0ea79abd01d8265737"),
                "statement": "请输入申请理由15",
                "_id": ObjectId("59380ed533bc5037e41136e0")
            },
            {
                "memberId": ObjectId("5937f81da15c2219f09f5dac"),
                "statement": "请输入申请理由19",
                "_id": ObjectId("5938100f33bc5037e41136ed")
            }
        ]
    });
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218cced"),
        "name": "PS社",
        "imgSrc": "/web/file/showImg?location=associationimg&name=ps.jpg",
        "proprieterId": ObjectId("5926b1be5abc0621e218cce6"),
        "admins": [
            ObjectId("5926b1be5abc0621e218cce6"),
            ObjectId("5926b1be5abc0621e218cce4")
        ],
        "members": [
            ObjectId("5926b1be5abc0621e218cce6"),
            ObjectId("5926b1be5abc0621e218cce4"),
            ObjectId("5937f7c6e98de4205c99111e"),
            ObjectId("5937fcb4e104b51f143b0181"),
            ObjectId("5937fd58e104b51f143b0184"),
            ObjectId("5937fd7ce104b51f143b0185"),
            ObjectId("5937fda2e104b51f143b0186"),
            ObjectId("5937fd4ea79abd01d8265739"),
            ObjectId("5937fa01be67ac0674f2643e"),
            ObjectId("5937faa6244047041038c839")
        ],
        "logoimage": "/web/file/showImg?location=clubheadimg&name=2015210405075ps.jpg",
        "introduction": "大家一起来PS！",
        "application": [
            {
                "memberId": ObjectId("5937f96c20983a2908dcc961"),
                "statement": "请输入申请理由18",
                "_id": ObjectId("59380fb733bc5037e41136ea")
            },
            {
                "memberId": ObjectId("5937f81da15c2219f09f5dac"),
                "statement": "请输入申请理由19",
                "_id": ObjectId("59380fe333bc5037e41136eb")
            },
            {
                "memberId": ObjectId("5937f5c93285cf3770ef71ed"),
                "statement": "请输入申请理由20",
                "_id": ObjectId("5938106333bc5037e41136ef")
            }
        ]
    });
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccee"),
        "name": "AE社",
        "imgSrc": "/web/file/showImg?location=associationimg&name=ae.jpg",
        "proprieterId": ObjectId("5926b1be5abc0621e218cce7"),
        "admins": [
            ObjectId("5926b1be5abc0621e218cce7"),
            ObjectId("5926b1be5abc0621e218cce4")
        ],
        "members": [
            ObjectId("5926b1be5abc0621e218cce7"),
            ObjectId("5926b1be5abc0621e218cce4"),
            ObjectId("5937fba9ae425317008e5d53"),
            ObjectId("5937fa825be0831bd4807a3a"),
            ObjectId("5937fcb4e104b51f143b0181"),
            ObjectId("5937fd58e104b51f143b0184"),
            ObjectId("5937fd7ce104b51f143b0185"),
            ObjectId("5937fdafa79abd01d826573b"),
            ObjectId("5937fd80a79abd01d826573a"),
            ObjectId("5937fd4ea79abd01d8265739"),
            ObjectId("5937faa6244047041038c839"),
            ObjectId("5937fa01be67ac0674f2643e"),
            ObjectId("5937faa6244047041038c839"),
            ObjectId("5937f5c93285cf3770ef71ed"),
            ObjectId("5937f81da15c2219f09f5dac"),
            ObjectId("5937fb0ea79abd01d8265737"),
            ObjectId("5937fa01be67ac0674f2643e")
        ],
        "logoimage": "/web/file/showImg?location=clubheadimg&name=2015210405075ae.jpg",
        "introduction": "大家一起做视频！",
        "application": [
            {
                "memberId": ObjectId("5937fcc5a79abd01d8265738"),
                "statement": "请输入申请理由14",
                "_id": ObjectId("59380e5c33bc5037e41136dc")
            },
            {
                "memberId": ObjectId("5937f96c20983a2908dcc961"),
                "statement": "请输入申请理由18",
                "_id": ObjectId("59380fac33bc5037e41136e9")
            }
        ]
    });
db.association.insert(
    {
        "_id": ObjectId("5926b1be5abc0621e218ccef"),
        "name": "读书社",
        "imgSrc": "/web/file/showImg?location=associationimg&name=ds.jpg",
        "proprieterId": ObjectId("5926b1be5abc0621e218cce8"),
        "admins": [
            ObjectId("5926b1be5abc0621e218cce8"),
            ObjectId("5926b1be5abc0621e218cce4")
        ],
        "members": [
            ObjectId("5926b1be5abc0621e218cce8"),
            ObjectId("5926b1be5abc0621e218cce4")
        ],
        "logoimage": "/web/file/showImg?location=clubheadimg&name=2015210405075read.jpg",
        "introduction": "大家一起来看书！",
        "application": [
            {
                "memberId": ObjectId("5937f384faf14d1fd4d05ce2"),
                "statement": "3",
                "_id": ObjectId("5937f6a2e98de4205c99111d")
            },
            {
                "memberId": ObjectId("5937fba9ae425317008e5d53"),
                "statement": "2",
                "_id": ObjectId("5938094b33bc5037e41136bc")
            },
            {
                "memberId": ObjectId("5937fc58e104b51f143b0180"),
                "statement": "4",
                "_id": ObjectId("593809ad33bc5037e41136c0")
            },
            {
                "memberId": ObjectId("5937fcdae104b51f143b0182"),
                "statement": "6",
                "_id": ObjectId("59380a8133bc5037e41136c4")
            },
            {
                "memberId": ObjectId("5937fd31e104b51f143b0183"),
                "statement": "7",
                "_id": ObjectId("59380b6a33bc5037e41136c8")
            },
            {
                "memberId": ObjectId("5937fd7ce104b51f143b0185"),
                "statement": "请输入申请理由9",
                "_id": ObjectId("59380c6033bc5037e41136cf")
            },
            {
                "memberId": ObjectId("5937fda2e104b51f143b0186"),
                "statement": "请输入申请理由10",
                "_id": ObjectId("59380cce33bc5037e41136d0")
            },
            {
                "memberId": ObjectId("5937fdafa79abd01d826573b"),
                "statement": "请输入申请理由11",
                "_id": ObjectId("59380d9333bc5037e41136d3")
            },
            {
                "memberId": ObjectId("5937fd80a79abd01d826573a"),
                "statement": "请输入申请理由11",
                "_id": ObjectId("59380dd533bc5037e41136d6")
            },
            {
                "memberId": ObjectId("5937fd4ea79abd01d8265739"),
                "statement": "请输入申请理由13",
                "_id": ObjectId("59380e1a33bc5037e41136d9")
            },
            {
                "memberId": ObjectId("5937fb0ea79abd01d8265737"),
                "statement": "请输入申请理由15",
                "_id": ObjectId("59380ea333bc5037e41136de")
            },
            {
                "memberId": ObjectId("5937faa6244047041038c839"),
                "statement": "请输入申请理由16",
                "_id": ObjectId("59380efd33bc5037e41136e2")
            },
            {
                "memberId": ObjectId("5937fa01be67ac0674f2643e"),
                "statement": "请输入申请理由17",
                "_id": ObjectId("59380f5d33bc5037e41136e7")
            },
            {
                "memberId": ObjectId("5937f96c20983a2908dcc961"),
                "statement": "请输入申请理由18",
                "_id": ObjectId("59380f9c33bc5037e41136e8")
            }
        ]
    });

// -----------------------------------------------   activity   -------------------------------------------------------
db.activity.insert(
    {
        "_id": ObjectId("5937ff8cda32b23094993d43"),
        "title": "AE的介绍",
        "content": "<p>1.&nbsp; AE软件介绍</p><p>2.&nbsp; AE工具、面板、菜单栏等介绍</p><p>3.&nbsp; AE应用示范</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-04-14T16:00:00.000Z"),
        "place": "恕园9-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "associationName": "AE社",
        "imgSrc": "/web/file/showImg?location=activityimg/AE&name=1.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5937ffb0da32b23094993d44"),
        "title": "AE 基本操作",
        "content": "<p>1.AE软件介绍</p><p>2.AE工具、面板、菜单栏等介绍</p><p>3.AE应用示范</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-09T16:00:00.000Z"),
        "place": "恕园10-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "associationName": "AE社",
        "imgSrc": "/web/file/showImg?location=activityimg/AE&name=2.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("59380102da32b23094993d45"),
        "title": "会声会影",
        "content": "<p>1.&nbsp; 会声会影的介绍</p><p>2.&nbsp; 视频剪辑合成的介绍</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-14T16:00:00.000Z"),
        "place": "恕园11-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "associationName": "AE社",
        "imgSrc": "/web/file/showImg?location=activityimg/AE&name=3.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("59380137da32b23094993d46"),
        "title": "对假期实践活动的视频",
        "content": "<p>&nbsp;1.<span style=\"font-family:宋体\">假期实践活动的视频制作</span></p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-17T16:00:00.000Z"),
        "place": "恕园12-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "associationName": "AE社",
        "imgSrc": "/web/file/showImg?location=activityimg/AE&name=4.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("59380186da32b23094993d47"),
        "title": "假期实践活动的视频展",
        "content": "<p><span style=\"font-size:14px;font-family:宋体\">视频展示</span></p>",
        "number": 100,
        "time": ISODate("2017-05-21T16:00:00.000Z"),
        "place": "恕园13-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "associationName": "AE社",
        "imgSrc": "/web/file/showImg?location=activityimg/AE&name=5.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5938066fda32b23094993d4e"),
        "title": "认识魔方构造",
        "content": "<p>1.介绍魔方的类型和形式</p><p>2.魔方基本术语与玩法介绍</p><p>3.指导认识魔方构造</p><p>4.指导正确的握转魔方的方法</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-04-18T16:00:00.000Z"),
        "place": "恕园9-101",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "associationName": "魔方社",
        "imgSrc": "/web/file/showImg?location=activityimg/魔方&name=1.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("593806aeda32b23094993d4f"),
        "title": "学转十字架",
        "content": "<p>1.&nbsp; 认识了解十字架。</p><p>2、&nbsp;转出一面十字架。&nbsp;</p><p>3、&nbsp;不同情况如何转好十字架。</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-04-25T16:00:00.000Z"),
        "place": "恕园10-101",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "associationName": "魔方社",
        "imgSrc": "/web/file/showImg?location=activityimg/魔方&name=2.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("593806ccda32b23094993d50"),
        "title": "学转还原底层角块",
        "content": "<p>1.&nbsp; 讲解还原底层角块</p><p>2.&nbsp; 几种特殊情况的转法</p><p>3.&nbsp; 限时还原</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-01T16:00:00.000Z"),
        "place": "恕园11-101",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "associationName": "魔方社",
        "imgSrc": "/web/file/showImg?location=activityimg/魔方&name=3.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("593806feda32b23094993d51"),
        "title": "学转中层棱块",
        "content": "<p>1.&nbsp; 讲解还原中层棱块</p><p>2.&nbsp; 还原口诀</p><p>3.&nbsp; 限时还原</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-07T16:00:00.000Z"),
        "place": "恕园12-101",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "associationName": "魔方社",
        "imgSrc": "/web/file/showImg?location=activityimg/魔方&name=4.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5938072bda32b23094993d52"),
        "title": "学转顶层十字",
        "content": "<p>1.&nbsp; 讲解顶层十字</p><p>2.&nbsp; 还原公式</p><p>3.&nbsp; 顶层三种状态和拧法</p><p>&nbsp;</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-13T16:00:00.000Z"),
        "place": "恕园13-101",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "associationName": "魔方社",
        "imgSrc": "/web/file/showImg?location=activityimg/魔方&name=5.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5938120b33bc5037e41136f6"),
        "title": "ps软件介绍",
        "content": "<p>1.&nbsp; PS软件介绍</p><p>2.&nbsp; PS工具、面板、菜单栏等介绍</p><p>3.&nbsp; PS应用示范</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-04-21T16:00:00.000Z"),
        "place": "恕园9-101",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "associationName": "PS社",
        "imgSrc": "/web/file/showImg?location=activityimg/PS&name=1.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5938122333bc5037e41136f7"),
        "title": "抠图技巧",
        "content": "<p>1.&nbsp; PS抠图之快速选择</p><p>2.&nbsp; PS抠图之魔棒</p><p>3.&nbsp; PS抠图之色彩范围</p><p>4.&nbsp; PS抠图之钢笔工具</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-02T16:00:00.000Z"),
        "place": "恕园10-101",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "associationName": "PS社",
        "imgSrc": "/web/file/showImg?location=activityimg/PS&name=2.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5938123e33bc5037e41136f8"),
        "title": "文字特效",
        "content": "<p>1.<span class=\"Apple-tab-span\" style=\"white-space: pre;\">\t</span>火焰字的应用</p><p>2.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>文字变形工具</p><p>3.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>蒙版工具的应用</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-10T16:00:00.000Z"),
        "place": "恕园11-101",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "associationName": "PS社",
        "imgSrc": "/web/file/showImg?location=activityimg/PS&name=3.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5938126f33bc5037e41136f9"),
        "title": "简单海报的制作",
        "content": "<p>1.&nbsp; 海报制作的要求及原则</p><p>2.&nbsp; 简单海报的制作</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-17T16:00:00.000Z"),
        "place": "恕园12-101",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "associationName": "PS社",
        "imgSrc": "/web/file/showImg?location=activityimg/PS&name=4.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5938128733bc5037e41136fa"),
        "title": "海报设计大赛",
        "content": "<p>1.&nbsp; 海报制作</p><p>2.&nbsp; 现场展示并评比</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-23T16:00:00.000Z"),
        "place": "恕园13-101",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "associationName": "PS社",
        "imgSrc": "/web/file/showImg?location=activityimg/PS&name=5.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("59380089588cfd2eb4553a8e"),
        "title": "讲座",
        "content": "<p>1.<span class=\"Apple-tab-span\" style=\"white-space: pre;\">\t</span>世界读书日发展历史</p><p>2.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>世界读书日主题</p><p>3.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>读书活动</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-04-22T16:00:00.000Z"),
        "place": "恕园13-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "associationName": "读书社",
        "imgSrc": "/web/file/showImg?location=activityimg/读书&name=1.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("593800b8588cfd2eb4553a8f"),
        "title": "书签设计大赛",
        "content": "<p>1.<span class=\"Apple-tab-span\" style=\"white-space: pre;\">\t</span>现场设计书签</p><p>2.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>展示书签并讲解设计理念</p><p>3.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>现场投票决出名次</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-04-29T16:00:00.000Z"),
        "place": "恕园12-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "associationName": "读书社",
        "imgSrc": "/web/file/showImg?location=activityimg/读书&name=2.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("593800dc588cfd2eb4553a90"),
        "title": "百科知识竞赛",
        "content": "<p>1.<span class=\"Apple-tab-span\" style=\"white-space: pre;\">\t</span>百科知识竞赛</p><p>2.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>颁奖仪式</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-03T16:00:00.000Z"),
        "place": "恕园11-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "associationName": "读书社",
        "imgSrc": "/web/file/showImg?location=activityimg/读书&name=3.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("59380162588cfd2eb4553a91"),
        "title": "读书心得交流会",
        "content": "<p class=\"MsoListParagraph\" style=\"margin-left: 94px\">1.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">讲述读书心得</span></p><p class=\"MsoListParagraph\" style=\"margin-left: 94px\">2.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">交流读书体会</span></p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-09T16:00:00.000Z"),
        "place": "恕园10-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "associationName": "读书社",
        "imgSrc": "/web/file/showImg?location=activityimg/读书&name=4.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("5938017f588cfd2eb4553a92"),
        "title": "好书推荐",
        "content": "<p>&nbsp;</p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">1.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">推荐好书并讲述理由</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">2.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">书目征集</span></p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-14T16:00:00.000Z"),
        "place": "恕园9-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "associationName": "读书社",
        "imgSrc": "/web/file/showImg?location=activityimg/读书&name=5.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("59381165f8cc3d2e24a75a84"),
        "title": "桌游是什么",
        "content": "<p class=\"MsoListParagraph\" style=\"margin-left:94px\">1.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">桌游简介</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">2.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">桌游分类</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">3.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">知名桌游介绍</span></p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-04-20T16:00:00.000Z"),
        "place": "恕园9-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "associationName": "桌游社",
        "imgSrc": "/web/file/showImg?location=activityimg/桌游&name=1.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("59381180f8cc3d2e24a75a85"),
        "title": "UNO游戏相关介绍",
        "content": "<p class=\"MsoListParagraph\" style=\"margin-left:94px\">1.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>UNO<span style=\"font-family:宋体\">游戏牌型</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">2.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>UNO<span style=\"font-family:宋体\">游戏规则及玩法</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">3.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">特殊情况及规则</span></p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-04-27T16:00:00.000Z"),
        "place": "恕园10-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "associationName": "桌游社",
        "imgSrc": "/web/file/showImg?location=activityimg/桌游&name=2.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("593811a0f8cc3d2e24a75a86"),
        "title": "三国杀游戏相关介绍",
        "content": "<p class=\"MsoListParagraph\" style=\"margin-left:94px\">1.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">游戏特色</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">2.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">游戏卡牌及介绍</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">3.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">游戏规则</span></p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-04T16:00:00.000Z"),
        "place": "恕园11-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "associationName": "桌游社",
        "imgSrc": "/web/file/showImg?location=activityimg/桌游&name=3.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("593811bbf8cc3d2e24a75a87"),
        "title": "六博棋相关介绍",
        "content": "<p>1.<span class=\"Apple-tab-span\" style=\"white-space: pre;\">\t</span>六博棋历史起源及其发展</p><p>2.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>六博棋形制</p><p>3.<span class=\"Apple-tab-span\" style=\"white-space:pre\">\t</span>六博棋玩法</p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-08T16:00:00.000Z"),
        "place": "恕园12-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "associationName": "桌游社",
        "imgSrc": "/web/file/showImg?location=activityimg/桌游&name=4.jpg",
        "attendingStudent": [],
        "__v": 0
    });
db.activity.insert(
    {
        "_id": ObjectId("593811d5f8cc3d2e24a75a88"),
        "title": "狼人杀游戏相关介绍",
        "content": "<p class=\"MsoListParagraph\" style=\"margin-left:94px\">1.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">背景设定</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">2.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">角色介绍</span></p><p class=\"MsoListParagraph\" style=\"margin-left:94px\">3.<span style=\"font-variant-numeric: normal;font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"font-family:宋体\">游戏玩法</span></p><p><br/></p>",
        "number": 100,
        "time": ISODate("2017-05-15T16:00:00.000Z"),
        "place": "恕园13-101",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "associationName": "桌游社",
        "attendingStudent": [],
        "__v": 0
    });

// -------------------------------------------------   news   ---------------------------------------------------------
db.news.insert(
    {
        "_id": ObjectId("5938043cda32b23094993d49"),
        "title": "AE 的基本操作",
        "content": "<p>After Effects中的面板主要有：</p><p>项目面板、特效控制面板、时间线面板、合成面板、信息面板、音频面板、预览面板、字符面板、特效和预置面板。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ae (3).jpg",
        "time": ISODate("2017-06-07T13:48:44.215Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593804c2da32b23094993d4a"),
        "title": "AE的介绍",
        "content": "<p>Adobe After Effects简称“AE”是<a href=\"http://baike.baidu.com/item/Adobe\" target=\"_blank\">Adobe</a>公司推出的一款图形<a href=\"http://baike.baidu.com/item/%E8%A7%86%E9%A2%91%E5%A4%84%E7%90%86\" target=\"_blank\">视频处理</a>软件，适用于从事设计和视频特技的机构，包括电视台、动画制作公司、个人后期制作工作室以及多媒体工作室。属于层类型后期软件。</p><p>Adobe After Effects软件可以帮助您高效且精确地创建无数种引人注目的动态<a href=\"http://baike.baidu.com/item/%E5%9B%BE%E5%BD%A2\" target=\"_blank\">图形</a>和震撼人心的视觉效果。利用与其他Adobe软件无与伦比的紧密集成和高度灵活的2D和<a href=\"http://baike.baidu.com/item/3D/25017\" target=\"_blank\">3D</a>合成，以及数百种预设的效果和动画，为您的电影、视频、<a href=\"http://baike.baidu.com/item/DVD\" target=\"_blank\">DVD</a>和Macromedia Flash作品增添令人耳目一新的效果。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ae (5).jpg",
        "time": ISODate("2017-06-07T13:50:58.111Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593804ebda32b23094993d4b"),
        "title": "会声会影",
        "content": "<p>会声会影是加拿大corel公司制作的一款功能强大的<a href=\"http://baike.baidu.com/item/%E8%A7%86%E9%A2%91%E7%BC%96%E8%BE%91\" target=\"_blank\">视频编辑</a>软件，具有图像抓取和编修功能，可以抓取，转换MV、DV、V8、TV和实时记录抓取画面文件，并提供有超过100 多种的编制功能与效果，可导出多种常见的视频格式，甚至可以直接制作成DVD和VCD光盘。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ae (4).jpg",
        "time": ISODate("2017-06-07T13:51:39.664Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("5938051bda32b23094993d4c"),
        "title": "对假期实践活动的视频",
        "content": "<p>无论在生活中还是网络上，我们经常看到别人可以将各种照片和视频制作成一个精美的视频。在现代社会中，视频制作越来越被大众所推崇，视频制作软件也层出不穷，如今除了需要下载在电脑上才能使用的视频制作软件外，一些移动端的视频制作软件逐渐走俏。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ae (3).jpg",
        "time": ISODate("2017-06-07T13:52:27.520Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593805c5da32b23094993d4d"),
        "title": "视展示",
        "content": "<p>视频展示活动当天：<br/>　　1. 各社团将海报等放置在场地两侧<br/>　　2. 由各社团表演本社团的特色节目，如跆拳道社的破板表演，双截棍社的双截棍表演，吉他社的吉他演奏，魔术社的魔术表演等<br/>　　3. 由各社团介绍游戏规则，邀请过往学生组队参与，优胜者可以参与抽奖活动，奖品到社联咨询台处兑换<br/>　　活动后期工作：<br/>　　1. 由社联负责统一打印各社团风采展活动当天照片，并出展板展示<br/>　　2. 将活动总结交至学院报社，由报社协助宣传<br/>四．活动当天安排<br/>　　1. 所需桌凳在早晨9点前准备到位<br/>　　2. 所需音箱、调音台等设备在早晨9点前准备到位，并调试好</p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccee"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ae (1).jpg",
        "time": ISODate("2017-06-07T13:55:17.383Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("5938111533bc5037e41136f1"),
        "title": "认识魔方构造",
        "content": "<p>魔方，Rubik&#39;s&nbsp;Cube&nbsp;又叫魔术方块，也称鲁比克方块。是匈牙利布达佩斯建筑学院厄尔诺·鲁比克教授在1974年发明的。魔方系由富于弹性的硬塑料制成的6面正方体。魔方与中国人发明的“华容道”，法国人发明的“独立钻石”一块被称为智力游戏界的三大不可思议。而魔方受欢迎的程度更是智力游戏界的奇迹。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7认识魔方构造.jpg",
        "time": ISODate("2017-06-07T14:43:33.686Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("5938112833bc5037e41136f2"),
        "title": "学转十字架",
        "content": "<p>魔方构建</p><p>中心块（6个）：</p><p>中心块与中心轴连接在一起，但可以顺着轴的方向自由的转动。</p><p>中心块的表面为正方形，结构略呈长方体，但长方体内侧并非平面，另外中心还有一个圆柱体连接至中心轴。</p><p>从侧面看，中心块的内侧会有一个圆弧状的凹槽，组合后，中心块和边块上的凹槽可组成一个圆形。旋转时，边块和角块会沿着凹槽滑动。</p><p>棱块（12个）：</p><p>棱块的表面是两个正方形，结构类似一个长方体从立方体的一个边凸出来，这样的结构可以让棱块嵌在两个中心块之间。</p><p>长方体表面上的弧度与中心块上的弧度相同，可以沿着滑动。立方体的内侧有缺角，组合后，中心块和棱块上的凹槽可组成一个圆形。旋转时，棱块和角块会沿着凹槽滑动。另外，这个缺角还被用来固定角块。</p><p>角块（8个）：</p><p>角块的表面是三个正方形，结构类似一个小立方体从立方体的一个边凸出来，这样的结构可以让角块嵌在三个棱块之间。与棱块相同，小立方体的表面一样有弧度，可以让角块沿着凹槽旋转。</p><p>中心轴（1个）：</p><p>用来支撑方块与转动方块所需要的支撑轴。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7转十字架.jpg",
        "time": ISODate("2017-06-07T14:43:52.924Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("5938114033bc5037e41136f3"),
        "title": "学转还原底层角块",
        "content": "<p><a href=\"http://baike.baidu.com/item/%E4%BA%8C%E9%98%B6%E9%AD%94%E6%96%B9\" target=\"_blank\">二阶魔方</a>的英文官方名字叫做Pocket Rubik&#39;s Cube或Mini Cube，中文直译叫做“口袋魔方”。它每个边有两个方块，官方版本之一魔方边长为40毫米，另外一个由东贤开发的轴型二阶魔方则为50毫米。二阶魔方的总变化数为 3,674,160 或者大约 3.67×10^6。二阶魔方（Pocket Cube）又称<a href=\"http://baike.baidu.com/item/%E5%8F%A3%E8%A2%8B%E9%AD%94%E6%96%B9\" target=\"_blank\">口袋魔方</a>、迷你魔方、小魔方、冰块魔方，为2×2×2的立方体结构。本身只有8个角块，没有其他结构的方块。结构与三阶魔方相近， 因为其没有中心块，所以可用假想中心法和复原三阶魔方的公式进行<a href=\"http://baike.baidu.com/item/%E5%A4%8D%E5%8E%9F\" target=\"_blank\">复原</a>。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7还原底层角块.jpg",
        "time": ISODate("2017-06-07T14:44:16.790Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("5938115433bc5037e41136f4"),
        "title": "学转中层棱块",
        "content": "<p>三阶魔方的英文官方名字叫做Rubik&#39;s Cube，也就是用鲁比克教授的名字命名的，是当前最普遍的魔方种类。它每个边有三个方块，官方版本魔方边长为57毫米，三阶魔方的总变化数是（8!x3^8x12!x2^12）/（2x2x3）=43,252,003,274,489,856,000或者约等于4.3x10^19.三阶魔方由一个连接着六个中心块的中心轴以及8个角块，12个棱块构成，当它们连接在一起的时候会形成一个整体，并且任何一面都可水平转动而不影响到其他方块。三阶魔方是生活中最常见的，而在2011年03月出现了新型三阶-面包三阶，打破了三阶魔方立方体的常规设计。</p><p>当前主流竞速三阶尺寸约为56mm。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7中层棱块.jpg",
        "time": ISODate("2017-06-07T14:44:36.863Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("5938116533bc5037e41136f5"),
        "title": "学转顶层十字",
        "content": "<p><a href=\"http://baike.baidu.com/item/%E5%9B%9B%E9%98%B6%E9%AD%94%E6%96%B9\" target=\"_blank\">四阶魔方</a>的英文官方名字叫做Rubik&#39;s Revenge，直译过来是“魔方的复仇”。相对于三阶来说就要复杂的多，它的构成分为两类，一类中心是一个球体，每个外围的小块连接着中心球的滑轨，在运动时候会沿着用力方向在滑轨上滑动。第二类是以轴为核心的四阶魔方，其实这类四阶魔方就是隐藏中层的五阶魔方，内部的小零件即为五阶的侧心块和中棱块，中轴上有防止锁死的突起装置。作为竞速运动来说第二种构成的四阶魔方运动速度快，不易在高速转动中卡住。4阶魔方的官方版本大概边长为67毫米，Mefferts版本为60毫米。四阶魔方被认为是2-5阶魔方中最不好复原的，虽然5阶魔方的变化种类比4阶多，但是4阶魔方的中心块并不固定，也就不能用一般的方法进行复原。四阶魔方共有7,401,196,841,564,901,869,874,093,974,498,574,336,000,000,000种变化</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7顶层十字.jpg",
        "time": ISODate("2017-06-07T14:44:53.371Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("5938145f8ebbae26b8d2705d"),
        "title": "ps软件介绍",
        "content": "<p>Adobe Photoshop，简称“PS”，是由<a href=\"http://baike.baidu.com/item/Adobe\" target=\"_blank\">Adobe</a>&nbsp;Systems开发和发行的<a href=\"http://baike.baidu.com/item/%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E8%BD%AF%E4%BB%B6\" target=\"_blank\">图像处理软件</a>。</p><p>Photoshop主要处理以像素所构成的<a href=\"http://baike.baidu.com/item/%E6%95%B0%E5%AD%97%E5%9B%BE%E5%83%8F\" target=\"_blank\">数字图像</a>。使用其众多的编修与绘图工具，可以有效地进行<a href=\"http://baike.baidu.com/item/%E5%9B%BE%E7%89%87%E7%BC%96%E8%BE%91\" target=\"_blank\">图片编辑</a>工作。ps有很多功能，在图像、图形、文字、视频、出版等各方面都有涉及。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ps (2).jpg",
        "time": ISODate("2017-06-07T14:57:35.308Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593814868ebbae26b8d2705e"),
        "title": "抠图技巧",
        "content": "<p>魔术棒法——最直观的方法</p><p>适用范围：图像和背景色色差明显，背景色单一，图像边界清晰。</p><p>方法意图：通过删除背景色来获取图像。</p><p>方法缺陷：对散乱的毛发没有用。</p><p>使用方法：</p><p>1、点击”魔术棒”工具；</p><p>2、在”魔术棒”工具条中，在”连续”项前打勾；</p><p>3、”容差”值填入”20″。（值可以看之后的效果好坏进行调节）；</p><p>4、用魔术棒点背景色，会出现虚框围住背景色；</p><p>5、如果对虚框的范围不满意，可以先按CTRL+D取消虚框，再对上一步的”容差”值进行调节；</p><p>6、如果对虚框范围满意，按键盘上的DELE键，删除背景色，就得到了单一的图像。</p><p>&nbsp;</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ps (1).jpg",
        "time": ISODate("2017-06-07T14:58:14.355Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("5938149b8ebbae26b8d2705f"),
        "title": "文字特效",
        "content": "<p>视觉创意与设计是设计艺术的一个分支，此类设计通常没有非常明显的商业目的，但由于他为广大设计爱好者提供了广阔的设计空间，因此越来越多的设计<a href=\"http://baike.baidu.com/item/%E7%88%B1%E5%A5%BD%E8%80%85\" target=\"_blank\">爱好者</a>开始学习Photoshop，并进行具有个人特色与风格的视觉创意。<a href=\"http://baike.baidu.com/item/%E7%95%8C%E9%9D%A2%E8%AE%BE%E8%AE%A1\" target=\"_blank\"><br/> &nbsp;&nbsp;&nbsp; 界面设计</a>是一个新兴的领域，受到越来越多的软件企业及开发者的重视。在当前还没有用于做<a href=\"http://baike.baidu.com/item/%E7%95%8C%E9%9D%A2%E8%AE%BE%E8%AE%A1\" target=\"_blank\">界面设计</a>的专业软件，因此绝大多数设计者使用的都是该软件。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ps (2).jpg",
        "time": ISODate("2017-06-07T14:58:35.121Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593814af8ebbae26b8d27060"),
        "title": "简单海报的制作",
        "content": "<p>平面设计是Photoshop应用最为广泛的领域，无论是图书封面，还招帖、海报，这些平面印刷品通常都需要Photoshop软件对图像进行处理。</p><p>Photoshop的专长在于图像处理，而不是图形创作。图像处理是对已有的位图图像进行编辑加工处理以及运用一些特殊效果，其重点在于对图像的处理加工；图形创作软件是按照自己的构思创意，使用矢量图形等来设计图形。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ps (5).jpg",
        "time": ISODate("2017-06-07T14:58:55.302Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593814bc8ebbae26b8d27061"),
        "title": "海报设计大赛",
        "content": "<p><span style=\"font-size:14px;font-family:宋体\">海报展示</span></p>",
        "associationId": ObjectId("5926b1be5abc0621e218cced"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7ps (3).jpg",
        "time": ISODate("2017-06-07T14:59:08.991Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593817e97f11d421443b2826"),
        "title": "桌游是什么",
        "content": "<p>桌上游戏发源于德国，在欧美地区已经风行了几十年。大家以游戏会友、交友。在国外，桌上游戏内容涉及战争、贸易、文化、艺术、城市建设、历史等多个方面，大多使用纸质材料加上精美的模型辅助。它是一种面对面的游戏，非常强调交流。因此，桌面游戏是家庭休闲、朋友聚会、甚至商务闲暇等多种场合的最佳沟通方式。21世纪初它也登陆到中国国内，风靡白领群体。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7game (1).jpg",
        "time": ISODate("2017-06-07T15:12:41.389Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593818027f11d421443b2827"),
        "title": "UNO游戏相关介绍",
        "content": "<p>UNO是一种牌类游戏，于1971年由Merle Robbins发明，现由游戏公司Mattel生产。</p><p>UNO是西班牙语和意大利语中“1”的意思。由于游戏规则中，当玩家手上只余下一张牌时，必须喊出&quot;uno&quot;，因而得名。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7game (2).jpg",
        "time": ISODate("2017-06-07T15:13:06.533Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593818987f11d421443b2828"),
        "title": "三国杀游戏相关介绍",
        "content": "<p>《三国杀》是中国传媒大学动画学院04级游戏专业学生设计，由北京游卡桌游文化发展有限公司出版发行的一款热门的桌上游戏，并在2009年6月底由杭州边锋网络技术有限公司开发出网络游戏。该游戏融合了西方类似游戏的特点，并结合中国三国时期背景，以身份为线索，以卡牌为形式，合纵连横，经过一轮一轮的谋略和动作获得最终的胜利。三国杀集合历史、文学、美术等元素于一身，在中国广受欢迎。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7game (5).jpg",
        "time": ISODate("2017-06-07T15:15:36.674Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("593819fd7f11d421443b282b"),
        "title": "六博棋相关介绍",
        "content": "<p>六博棋是古代棋戏的一种，在春秋战国和秦汉时期都非常盛行。这种棋由两人玩，双方各有六枚棋子。其中各有一枚相当于王的棋子叫“枭”，另有五枚相当于卒的棋子叫“散”。行棋在刻有曲道的盘局上进行，用投箸的方法决定行棋的步数。据现代棋史学家的研究，这种古老的六博棋实际上是世界上一切有兵种盘局棋戏的鼻祖，诸如象棋、国际象棋、将棋等等有兵种的棋戏，都是由六博棋逐渐演变改革而成。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7game (4).jpg",
        "time": ISODate("2017-06-07T15:21:33.444Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("59381a277f11d421443b282c"),
        "title": "狼人杀游戏相关介绍",
        "content": "<p>狼人杀，是一款多人参与的、以语言描述推动的、较量口才和分析判断能力的策略类桌面游戏。通常的版本需要8-18人参与。狼人杀游戏的机制与杀人游戏相类似，杀人游戏更倾向于竞技，狼人杀游戏则更加欢乐，角色更丰富。游戏分为两大阵营，狼人和村民；村民方以投票为手段投死狼人获取最后胜利，狼人阵营隐匿于村民中间，靠夜晚杀人及投票消灭村民方成员为获胜手段，狼人杀属于桌面游戏，可以多人玩。</p><p>&nbsp;</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccec"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7game (3).jpg",
        "time": ISODate("2017-06-07T15:22:15.181Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("59381b8f7f11d421443b282d"),
        "title": "讲座",
        "content": "<p>世界读书日全称为世界图书与版权日，又称“世界图书日”。最初的创意来自于国际出版商协会。1995年11月15日正式确定每年4月23日为“世界图书与版权日”，设立目的是推动更多的人去阅读和写作，希望所有人都能尊重和感谢为人类文明做出过巨大贡献的文学、文化、科学、思想大师们，保护知识产权。每年的这一天，世界一百多个国家都会举办各种各样的庆祝和图书宣传活动 。</p><p style=\"text-indent:28px\">&nbsp;</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7讲 座.jpg",
        "time": ISODate("2017-06-07T15:28:15.462Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("59381bad7f11d421443b282e"),
        "title": "书签设计大赛",
        "content": "<p>四月是个读书的季节。青春四月，丹墨书香，好的书签才能体现出书香校园的独有特质。一枚小小的书签也许承载着你对书的热爱，对书的理解，和对书的感悟。书签不是装饰书的一种手段，更是那些能够触动你心弦书的钥匙。书签可以培养学生养成爱读书，勤读书，读好书的良好习惯，让我们能够更好的掌握自己学习的进度，让我们的学习更有节奏感。&nbsp;</p><p>&nbsp;&nbsp;此次“书签设计大赛”给同学们提供了一个展示自我创意，书写文化特质的舞台，同时也提高了同学们的创新能力和动手能力，进一步充实了同学们的学习生活，提高了同学们的文学修养，也让同学们认识到读书的重要性。</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7书签设计.jpg",
        "time": ISODate("2017-06-07T15:28:45.074Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("59381bc27f11d421443b282f"),
        "title": "百科知识竞赛",
        "content": "<p>这次比赛是一场智慧的交锋，一次思想的碰撞，但我们知道术业有道，邃密群科，在比分之外，最为重要的其实是学子对知识的态度。大学之大，终在学术，在这个信息泛滥、娱乐至死的时代，有这样一群人始终对知识孜孜以求，好学乐道，对这种精神加以褒奖与检验，这才是百科知识竞赛出现的核心意义。在此感谢每一个参与百科、关注百科的人，是你们的努力让这个信念得以传递，代代不息。</p><p style=\"text-indent:28px\">&nbsp;</p><p><br/></p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7百科知识.jpg",
        "time": ISODate("2017-06-07T15:29:06.805Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("59381bdd7f11d421443b2830"),
        "title": "读书心得交流会",
        "content": "<p>书籍，是人类宝贵的精神财富，是经验教训的结晶，是走向未来的基石;读书，是人们重要的学习方式，是人生奋斗的航灯，是文化传承的通道，是人类进步的阶梯。读书应当是一个人日常的生活方式，理想的教育“应该重视让学生与书本为友，与大师对话”。在新课程改革的背景下,开展读书活动，也是提高教育教学质量的有效途径。为了扩大学生阅读量，增加学生的语言积累，活跃校园文化，促进学生的个性发展，让每一位学生与书为伴，养成爱读书、好读书、读好书的习惯，并积极配合学校开展的的读书活动，特制订此读书计划。</p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7读书心得.jpg",
        "time": ISODate("2017-06-07T15:29:33.055Z"),
        "__v": 0
    });

db.news.insert(
    {
        "_id": ObjectId("59381bf47f11d421443b2831"),
        "title": "好书推荐",
        "content": "<p>古语云“读书可以开茅塞，除鄙见，得新知，增学问，广见识”，读书亦足以怡情，足以博彩，足以成长。为了培养同学们良好的阅读习惯，体验读书的乐趣，与好书为友，营造爱读书、读好书、善读书的书香校园，我们开展了“好书推荐”活动。</p>",
        "associationId": ObjectId("5926b1be5abc0621e218ccef"),
        "imgSrc": "/web/file/showImg?location=newsimg&name=2017-6-7好书推荐.jpg",
        "time": ISODate("2017-06-07T15:29:56.849Z"),
        "__v": 0
    });

// -------------------------------------------------   file   ---------------------------------------------------------
db.file.insert(
    {
        "_id": ObjectId("5935028adaa8a34b10e069b4"),
        "title": "aaa.txt",
        "content": "aaaaaaa",
        "url": "upload/file/5926b1be5abc0621e218ccebaaa.txt",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "time": ISODate("2017-06-05T07:04:42.591Z"),
        "__v": 0
    });
db.file.insert(
    {
        "_id": ObjectId("593503ffdaa8a34b10e069b5"),
        "title": "bbb.txt",
        "content": "bbbbbbbb",
        "url": "upload/file/5926b1be5abc0621e218ccebbbb.txt",
        "associationId": ObjectId("5926b1be5abc0621e218cceb"),
        "time": ISODate("2017-06-05T07:10:55.765Z"),
        "__v": 0
    });
