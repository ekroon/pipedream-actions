import { Octokit } from "octokit"

export default defineComponent({
  name: "Add Issue or PR to ProjectV2 GitHub action",
  description: "This action can, when triggered by a webhook, add an Issue or PR to a ProjectV2 board",
  key: "github_add_content_to_projectv2_action",
  version: "0.0.3",
  type: "action",
  props: {
    github: {
      type: "app",
      app: "github",
    },
    projectId: {
      type: "string",
      label: "GraphQL ProjectV2 ID"
    },
    contentId: {
      type: "string",
      label: "GraphQL Issue or PR ID"
    }
  },
  async run({ $ }) {
    const octokit = new Octokit({
      auth: this.github.$auth.oauth_access_token,
    })
  
    if (!this.contentId || !this.projectId) {
      return;
    }
    console.log(this.contentId)
    return await octokit.graphql(`
      mutation addItem($projectId: ID!, $contentId: ID!) { 
        addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId}) {
          item {
            id
          }
        } 
      }
    `, {
      "projectId": this.projectId,
      "contentId": this.contentId
    })
  },
})
