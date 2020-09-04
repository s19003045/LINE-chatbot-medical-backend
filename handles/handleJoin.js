'use strict'

// import model
const db = require('../models')
// const LineUser = db.LineUser
// const WelcomeMsg = db.WelcomeMsg
// const LineUserChatbot = db.LineUserChatbot
// const Chatbot = db.Chatbot
const Group = db.Group
const GroupUser = db.GroupUser
const Room = db.Room
const RoomUser = db.RoomUser

// import helpers
const getGroupMembersProfile = require('./helpers/getGroupMembersProfile.js')

const handleJoin = async function ({
  event,
  client,
  reqParams
}) {
  try {
    //取得 group 或 room 的資訊
    switch (event.source.type) {
      case 'group':
        // 取得 group 資訊
        const group = await client.getGroupSummary(event.source.groupId)
        // 取得 group 人數
        const groupMembersCount = await client.getGroupMembersCount(event.source.groupId)

        //先確認資料庫是否已有 group 資訊
        const groupFind = await Group.findOne({
          where: {
            groupId: event.source.groupId
          }
        })
        if (groupFind) {
          groupFind.groupName = group.groupName
          groupFind.pictureUrl = group.pictureUrl
          groupFind.count = groupMembersCount.count
          // 儲存 group 資訊
          await groupFind.save()
        } else {
          // 建立 group 資訊
          const groupCreate = await Group.create({
            groupId: event.source.groupId,
            groupName: group.groupName,
            pictureUrl: group.pictureUrl,
            count: groupMembersCount.count
          })
        }

      case 'room':
        return
      default:
        return
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = handleJoin