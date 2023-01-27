import { getSingleMember, deleteMember } from './memberData';
import { getTeamMembers, getSingleTeam, deleteSingleTeam } from './teamData';
import { getSingleVillain } from './villainData';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      getSingleTeam(memberObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamMembers(teamFirebaseKey)])
    .then(([teamObject, teamMembersArray]) => {
      resolve({ ...teamObject, members: teamMembersArray });
    }).catch((error) => reject(error));
});

const deleteTeamMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamMembers(teamId).then((membersArray) => {
    const deleteMemberPromises = membersArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewVillainDetails = (villainFirebaseKey) => new Promise((resolve, reject) => {
  getSingleVillain(villainFirebaseKey)
    .then((villainObject) => {
      resolve({ ...villainObject });
    }).catch((error) => reject(error));
});

// eslint-disable-next-line import/prefer-default-export
export {
  viewMemberDetails, viewTeamDetails, deleteTeamMembers, viewVillainDetails,
};
