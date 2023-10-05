import { gql } from "@apollo/client";
export const getAllReportType = gql`
  query {
    reportTypes {
      id
      name
    }
    bugReports {
      id
      name
      reason
      reportType {
        id
        name
      }
      createdAt
    }
  }
`;
export const mutationReport = gql`
  mutation (
    $title: String!
    $name: String!
    $reason: String!
    $reportType: ID
  ) {
    createReport(
      input: {
        title: $title
        name: $name
        reason: $reason
        reportType: $reportType
      }
    ) {
      report {
        id
        title
        name
        reason
        reportType {
          id
          name
        }
      }
    }
  }
`;
