import { gql } from "@apollo/client";

export const VIRTUAL_FLOORS = gql`
  query VirtualFloors ($id: String) {
    virtualFloors( where: {id: $id} ) {
      id
      subcategory {
        slug
        category {
          slug
        }
      }
      title
      description
      isListed
      paymentToken {
        symbol
        decimals
        address
      }
      creationFeeRate
      platformFeeRate
      tCreated
      tOpen
      tClose
      tResultSetMin
      tResultSetMax
      tResultChallengeMax
      state
      discordChannelId
      bonusAmount
      minCommitmentAmount
      maxCommitmentAmount
      winningOutcome {
        id
        index
      }
      totalSupply
      betaOpen
      owner {
        id
      }
      opponents {
        id
        title
        image
      }
      outcomes {
        index
        totalSupply
        totalWeightedSupply
        title
        outcomeTimeslots {
          timeslot {
            id
            minTimestamp
          }
          totalSupply
        }
        virtualFloor{
          id
          state
          tClose
          tResultSetMin
          tResultSetMax
          tResultChallengeMax
          tOpen
          betaOpen
          bonusAmount
          minCommitmentAmount
          maxCommitmentAmount
          paymentToken {
            symbol
            decimals
            address
          }
        }
      }
      resultSources {
        id
        title
        url
      }
    }

  }
`;

export const USER_BET_INFO = `
  query($user: String, $virtualFloorId: String) {
    virtualFloors( where: {id: $virtualFloorId} ) {
      id
      winningOutcome {
        id
        index
      }
      outcomes {
        index
        totalSupply
        totalWeightedSupply
        title
        userOutcomes(where: { user: $user }) {
          totalBalance
          totalWeightedBalance
        }
        outcomeTimeslots {
          timeslot {
            id
            minTimestamp
          }
          totalSupply
          userOutcomeTimeslots(where: { user: $user }) {
            user { id }
            balance
          }
        }
      }
    }

  }
`;

export const USER_QUOTA_INFO = `
  query($id: String) {
    users( where: {id: $id} ) {
      id
      maxConcurrentVirtualFloors
      concurrentVirtualFloors
      ownedVirtualFloors{
        id
      }
    }
  }
`;

export const VIRTUALFLOOR_POOL_AMOUNT = gql`
  query VirtualFloors ($id: String) {
    virtualFloors( where: {id: $id} ) {
      id
      totalSupply
    }
  }
`;

export const PAYMENT_TOKEN = `
  query {
    paymentTokens {
      id
      address
      name
      symbol
      decimals
    }
  }
      
`;


