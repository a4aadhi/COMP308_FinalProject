import { gql } from "@apollo/client";

const GET_TIPS_FOR_USER = gql`
  query GetTips($patientId: String!) {
    tips(patientId: $patientId) {
      _id
      title
      patientId
      description
    }
  }
`;

const ADD_TIP = gql`
mutation($patientId: String!, $title: String!, $description: String!) {
  addTip(patientId: $patientId, title: $title, description: $description) {
    _id
    patientId
    title
    description
  }
}
`
const UPDATE_TIP = gql`
mutation UpdateTip($id: String!, $patientId: String!, $title: String!, $description: String!) {
  updateTip(_id: $id, patientId: $patientId, title: $title, description: $description) {
    _id
    patientId
    title
    description
  }
}`

const DELETE_TIP = gql`
  mutation DeleteTip($_id: String!) {
    deleteTip(_id: $_id) {
      _id
    }
  }
`;

const GET_ONE_TIP = gql`
  query GetOneTip($_id: String!) {
    tip(_id: $_id) {
      _id
      title
      patientId
      description
    }
  }
`;

export {ADD_TIP, GET_TIPS_FOR_USER, DELETE_TIP, GET_ONE_TIP, UPDATE_TIP};