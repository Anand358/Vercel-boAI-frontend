# Assets

1.

- endpoint - upload_url/workspaces/{workspace_id}. ITS A GET REQUEST
- make sure the workspace_id is same for everything - ronald recommends to keep
  it as default

2.

- endpoint - upload_url/workspaces/{workspace_id}/media. it's a POST REQUEST.
  POSTTTTT
- it takes in {workspace_id} which is "default"
- takes in videos and images, not the HEIC files tho
- it gives a response body of images and videos array.
- integrate it on the orange card of /footage

3.

- endpoint - /workspaces/{workspace_id}/media
- integrate this on assets page to display the asset

add that google analytics code that anand sent
