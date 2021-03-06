Component({
    properties: {
        mData: {
            type: Object,
            value: {

            },
        },
        isSelf: {
            type: Boolean,
            value: false,
        },
    },
    ready() {
        for (let index = 140; index < 210; index++) {
            this.data.heightForPerson.push(index + 'cm')
        }

            this.data.ageArray.push("相差3岁以内")
            this.data.ageArray.push("相差5岁以内")
            this.data.ageArray.push("相差10岁以内")
            this.data.ageArray.push("相差20岁以内")
            this.data.ageArray.push("不限")

        for (let index = 40; index < 131; index++) {
            let str = index
            if (index == 40) {
                str = 40 + 'kg以下'
                this.data.weightForPerson.push(str)
            } else if (index == 130) {
                str = 130 + 'kg以上'
                this.data.weightForPerson.push(str)
            } else {
                this.data.weightForPerson.push(str + 'kg')
            }
        }
        this.setData({
            heightForPerson: this.data.heightForPerson,
            weightForPerson: this.data.weightForPerson,
            ageArray: this.data.ageArray,
        })

    },

    /**
     * 组件的方法列表
     */
    methods: {

        changeData(data) {
            this.triggerEvent('changeData', data)
        },

        doInput: function (e) {
            let type = e.currentTarget.dataset.type;
            let index = e.currentTarget.dataset.index;
            this.properties.mData.baseInfoTags[index].value = e.detail.value
            let infos = this.properties.mData.baseInfoTags
            this.setData({
                mData: this.properties.mData
            }, () => {
                this.changeData({type: 0, value: infos})
            });
        },

        changeBaseInfo(e) {
            let type = e.currentTarget.dataset.type;
            let data = e.currentTarget.dataset.data;
            let index = e.currentTarget.dataset.index;
            let p = e.detail.value
            this.properties.mData.baseInfoTags[index].value = data[p]
            let infos = this.properties.mData.baseInfoTags
            console.log("data",this.properties.mData)
            this.setData({
                mData: this.properties.mData
            }, () => {
                this.changeData({type: 0, value: infos})
            })
        },
        changeMatchInfo(e) {
            let type = e.currentTarget.dataset.type;
            let data = e.currentTarget.dataset.data;
            let index = e.currentTarget.dataset.index;
            let p = e.detail.value
            this.properties.mData.matchInfoTags[index].value = data[p]
            let infos = this.properties.mData.matchInfoTags
            this.setData({
                mData: this.properties.mData
            }, () => {
                this.changeData({type: 1, value: infos})
            })
        },

        bindMultiPickerColumnChange: function (e) {
            console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
            if (e.detail.column == 0) {
                let data = this.data.multiArray
                data[1] = this.data.objectMultiArray[e.detail.value]
                this.setData({
                    multiArray: data,
                })
            }
            this.data.multiIndex[e.detail.column] = e.detail.value
            this.setData({
                multiIndex: this.data.multiIndex,
            })


        },
        bindMultiPickerChange: function (e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                multiIndex: e.detail.value
            })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        defaultIndex: 0,


        ageArray: [],
        heightForPerson: [],
        weightForPerson: [],
        region: ['山西省', '运城市', '临猗县'],
        nativePlace: ['山西省', '运城市', '临猗县'],
        bodilyForm: ['保密', '正常', '瘦长', '运动型', '肥胖', '魁梧', '壮实'],
        bodilyIndex: 0,
        nationalityArray: ['汉族', '满族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族', '朝鲜族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'],
        nationalityIndex: 0,
        whatTimeMarryArray: ['闪婚', '一年内', '二年内', '三年内', '三年以上'],
        whatTimeMarryIndex: 1,

        smokeArray: ['不吸烟', '吸一点烟', '吸很多烟', '社交场合会吸烟'],
        smokeIndex: 0,


        drinkArray: ['不喝酒', '喝一点酒', '喝很多酒', '社交场合会喝酒'],
        drinkIndex: 0,


        earningIndex: 3,
        earningArray: [
            '3千以下',
            '3千-5千',
            '5千-8千',
            '8千-1.2万',
            '1.2万-2万',
            '2万-5万',
            '5万以上',
        ],
        hasBabyIndex: 0,
        hasBabyArray: [
            '没有小孩',
            '有小孩,住在一起',
            '有小孩,偶尔住在一起',
            '有小孩,不住在一起',
        ],

        needBabyIndex: 1,
        needBabyArray: [
            '视情况而定',
            '是',
            '否',
            '以后告诉你',
        ],
        houseIndex: 1,
        houseArray: [
            '已买房',
            '租房',
            '婚后租房',
            '单位租房',
        ],

        carIndex: 1,
        carArray: [
            '已购车',
            '无车',
        ],
        townIndex: 0,
        townArray: [
            '孙吉镇',
            '县城',
            '嵋阳镇',
            '临晋镇',
            '七级镇',
            '东张镇',
            '三管镇',
            '牛杜镇',
            '耽子镇',
            '楚侯乡',
            '庙上乡',
            '北辛乡',
            '北景乡',
            '猗氏镇',
            '角杯乡',
            '其他',
        ],
        earningArray: [
            '3千以下',
            '3千-5千',
            '5千-8千',
            '8千-1.2万',
            '1.2万-2万',
            '2万-5万',
            '5万以上',
        ],
        schoolAgeIndex: 3,
        schoolAge: [
            '高中及以下',
            '中专',
            '大专',
            '大学本科',
            '硕士',
            '博士',
        ],

        marriageIndex: 0,
        marriageArray: [
            '单身',
            '离异',
            '丧偶'
        ],

        multiArray: [
            ['在校学生', '交通运输', '咨询/顾问', '传媒艺术', '物流/仓储', '销售', '政府机构', '法律', '生物/制药', '商贸/采购', '客户服务', '财务审计', '医疗/护理', '人事/行政', '计算机/互联网', '教育/科研', '金融/银行/保险', '高级管理', '通信/电子', '服务业', '建筑/房地产', '广告/市场', '生产/制造', '自由职业', '农林牧渔', '军人/警察', '其他职业', '待业'],
            []
        ],
        objectMultiArray: [
            [],
            [
                '飞行员',
                '空城人员',
                '地勤人员',
                '列车司机',
                '乘务员',
                '船长',
                '船员',
                '司机',
                '交通运输'
            ],
            [
                '专业顾问',
                '咨询经理',
                '咨询师',
                '培训师',
                '培训/顾问',
            ],
            [
                '主编',
                '编辑',
                '作家',
                '撰稿人',
                '文案策划',
                '出版发行',
                '导演',
                '记者',
                '主持人',
                '演员',
                '模特',
                '经纪人',
                '摄影师',
                '影视后期制作',
                '设计师',
                '画家',
                '音乐家',
                '舞蹈',
                '传媒/艺术',
            ],
            [
                '物流经理',
                '物流主管',
                '物流专员',
                '仓库经理',
                '货运代理',
                '集装箱业务',
                '海关事务管理',
                '报单员',
                '快递员',
                '物流/仓储',
            ],
            [
                '销售总监',
                '销售经理',
                '销售主管',
                '销售专员',
                '渠道/分销管理',
                '渠道/分销专员',
                '经销商',
                '客户经理',
                '客户代表',
                '销售',
            ],
            [
                '公务员',
                '政府机构'
            ],
            [
                '律师',
                '律师助理',
                '法务经理',
                '法务专员',
                '知识产权专员',
                '法律',
            ],
            [
                '生物工程',
                '药品生产',
                '临床研究',
                '医疗器械',
                '医药代表',
                '化工工程师',
                '生物/制药',
            ],
            [
                '商务经理',
                '商务专员',
                '采购经理',
                '采购专员',
                '外贸经理',
                '外贸专员',
                '业务跟单',
                '报关员',
                '商贸/采购',
            ],
            [
                '客服经理',
                '客服主管',
                '客服专员',
                '客服协调',
                '客服技术支持',
                '客户服务',
            ],
            [
                '财务总监',
                '财务经理',
                '财务主管',
                '会计',
                '注册会计师',
                '审计师',
                '税务经理',
                '税务专员',
                '成本经理',
                '财务/会计',
            ],
            [
                '医疗管理',
                '医生',
                '心里医生',
                '药剂师',
                '护士',
                '兽医',
                '医疗/护理'
            ],
            [
                '人事总监',
                '人事经理',
                '人事主管',
                '人事专员',
                '招聘经理',
                '招聘专员',
                '培训经理',
                '培训专员',
                '秘书',
                '文员',
                '后勤',
                '人事/行政',
            ],
            [
                'IT技术总监',
                'IT技术经理',
                'IT工程师',
                '系统管理员',
                '测试专员',
                '运营管理',
                '网页设计',
                '网站编辑',
                '网站产品经理',
                '计算机/互联网',
            ],
            [
                '教授',
                '讲师/助教',
                '中学教师',
                '小学教师',
                '幼师',
                '教务管理人员',
                '职业技术教师',
                '培训师',
                '科研管理人员',
                '科研人员',
                '教育/科研',
            ],
            [
                '投资',
                '保险',
                '金融',
                '银行',
                '证券',
                '金融/银行/保险',
            ],
            [
                '总经理',
                '副总经理',
                '合伙人',
                '总监',
                '经理',
                '总裁助理',
                '高级管理',
            ],
            [
                '通信技术',
                '电子技术',
                '通信/电子',
            ],
            [
                '餐饮管理',
                '厨师',
                '餐厅服务员',
                '酒店管理',
                '大堂经理',
                '酒店服务员',
                '导游',
                '美容师',
                '健身教练',
                '商场经理',
                '店员',
                '保安经理',
                '保安人员',
                '家政服务',
                '服务业',
            ],
            [
                '建筑师',
                '工程师',
                '规划师',
                '景观设计',
                '房地产策划',
                '房地产交易',
                '物业管理',
                '建筑/房地产',
            ],
            [
                '广告客户经理',
                '广告客户专员',
                '广告设计经理',
                '广告设计专员',
                '广告策划',
                '市场营销经理',
                '市场营销专员',
                '市场策划',
                '市场调研与分析',
                '市场拓展',
                '公关经理',
                '公关专员',
                '媒介经理',
                '媒介专员',
                '品牌经理',
                '品牌专员',
                '广告/市场',
            ],
            [
                '工厂经理',
                '工程师',
                '项目主管',
                '营运经理',
                '营运主管',
                '车间主任',
                '物料管理',
                '生产领班',
                '操作工人',
                '安全管理',
                '生产/制造',
            ],
            [],
            [],
            [],
            [],
            [],

        ],
        multiIndex: [0, 0],
    },


})