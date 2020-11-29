'use strict'

// import model
const db = require('../../models')
const Group = db.Group
const GroupUser = db.GroupUser
const Room = db.Room
const RoomUser = db.RoomUser
const LineUser = db.LineUser

const getGroupMembersProfile = async function (groupId) {
  // LINE 官方認證帳號才可以使用 getGroupMemberIds
  const groupMemberUserIds = await client.getGroupMemberIds(event.source.groupId)

  const queryUserProfile = []
  for (let i = 0; i < groupMemberUserIds.memberIds.length; i++) {
    queryUserProfile.push(await client.getGroupMemberProfile(event.source.groupId, groupMemberUserIds.memberIds[i]))
  }

  Promise.all(queryUserProfile)
    .then(getGroupUserProfile => {
      console.log('getGroupUserProfile', getGroupUserProfile)

      // const lineUsersCreate = []
      // for (let i = 0; i < groupMemberUserIds.memberIds.length; i++) {
      //   lineUsersCreate.push(await LineUser.findOrCreate({
      //     where: {
      //       UserId: groupMemberUserIds.memberIds[i],
      //       displayName:
      //         pictureUrl:res.


      //     }
      //   }))
      // }

      // Promise.all(groupUsersCreate)
      //   .then(res => {
      //     for (let i = 0; i < groupMemberUserIds.memberIds.length; i++) {
      //       groupUsersCreate.push(await GroupUser.findOrCreate({
      //         where: {
      //           GroupId: groupId,
      //           // UserId: groupMemberUserIds.memberIds[i]
      //         }
      //       }))
      //     }

      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })

    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = getGroupMembersProfile