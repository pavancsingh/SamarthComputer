# PowerShell script to download Samarth Computers Admin Dashboard Stitch project assets

$imgDir = "d:\Samarthcomputers\stitch_assets\admin\screenshots"
$codeDir = "d:\Samarthcomputers\stitch_assets\admin\code"

if (!(Test-Path -Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir -Force }
if (!(Test-Path -Path $codeDir)) { New-Item -ItemType Directory -Path $codeDir -Force }

$adminAssets = @(
  @{
    id = "410664f405f34e419b20dc36d50c4cd5"
    name = "01_courses_management"
    title = "Courses Management - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLs3aFcFRCwuGKwLjlMURGLRh0b68VrSxsRnlZO8Ro1vP610dLKY4llMcrbWIwJMTOnisGP_MA2trELzBp7ecd-kS5hOS45qBo-pOksjXkRAGrb_k_n9GqCEBbjRKT6Li85D39_s-YgmwOzHmf5CVp5VPhWJB7LfLUPEX6kZcVf200pSGwL7uFyeuklXBhbmhmOhBSwDw_svZ77m1HbZ2f8U_w09k15k1uetFovL-OMYR0f5rFYQ-dwVwGs"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2YTIwOWUxZTAwOTI1ZDQwMDhmMjIyYjRlEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  },
  @{
    id = "4acfa533547e451c850abc31fcd09e91"
    name = "02_login"
    title = "Login - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLvRZnXr3mYv2xyspzCAVyH7Je2YeJ5rw5IKdpxcwGAFnw-EWVCjUeYuanfeqVhjRqYFIusAfpMIecIaG8Sxw8Fqoo_pBVhLPqeJaiOnQMLYTjJ60UA10UA2PSGWCAM1zop5I7Mgjts_LzYRJ9hSpeFV1A6bvh3FhVvYiY5WkMbwjeu950IyJ5ASsQYAq4yNwOV-F6aOsRRCp3L9EueRRwFYz5ZmqItOsqJeo-CedQvSOf3LY3a_lMMNMGY"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2NTE3ZDM1NjEwMmE5YmQ2YjMwMGQwZDhiEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  },
  @{
    id = "aa80bcbdddb14bb097343c8dc987d349"
    name = "03_dashboard_overview"
    title = "Dashboard Overview - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLumRAJ_zohVrLX-H2_GGsn1jxbux0NEZk78qXRkP_mbajR5huXFkWgHKGeT_UftnD4s7_pRQM3HeMPuCgh3y0JHG8ItQqwmLafg-umtOJwqCeulbPfe-WnKPpkXccPM_p94RXbFgaO22tO6F1sDnhnZF_XI5YYKryermcaAu_mDzfM6rJ6-bXJpG8WcRkpJmOwOJ74v7wN7RQIcRUDHpNrHRWYGQaeFqjizMmSiDEbYhpltR9zRk3U8krA"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2NWRhNThlMTAwMmE5ODA1YzFiMDc1OTI5EgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  },
  @{
    id = "b82c13a8d2ad4551a4f5348289156838"
    name = "04_inbox_inquiries"
    title = "Inbox & Inquiries - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLs9DI5D530PhdocG7wLulLVloafmbKY21PiTqZ04ThV4ERmmOAav6OwfId61mDgWlitY4GZX66x5ig6wX_K2O70w38xQl9LKLHw7NNMSMwIjPBtx3VkS7KHEZFuSGFCXrY-fKOoEmwawbQ4eqfvVkMlGoG80N5O3TPedfcypQlaPSBhNfFpXrzgRQO35elNvT229HtvEAk-hXSce9duzp_oon1MT4NL4luwr16sspSNfrv_hD_hAV7l4n8"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2NTRlZmM1NGMwMmE5YTBhZjdlMWM3NWJhEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  },
  @{
    id = "65544cf0fb5740fdb6495d693334d50d"
    name = "05_course_details_drawer"
    title = "Course Details Side Drawer - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLslWBg-SunUYKrbYNaRSc_Z_IoP_s9D6RqvIcv9VHF6mEZtmMEf6gARrCPOTjYm_cY-l3a7Wpr_RjEylmF5vso4vEjnEWOpbJLCovfRVSnQ3QupqhTsFS03IP6v3I8WHIOKMqswvVxjZWvPh1rMWQIeP_glosI72OugZR2dBwCQDWTj4gQzKQd2hk807m0o2aJg-mh0HPnri5EaNgBcmSgkox21n5mG4_Q0ESZy6AumXhWf6I1mOXvN9zA"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2YTQwMTNkZTkwN2M0ZTUyNTA3MTRiMWMxEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  },
  @{
    id = "c319bf2580e54a8e8f2c69950b36a4b9"
    name = "06_csc_services"
    title = "CSC Services - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLv6NW5Cqr4Pxos8N4E1HDY-pCT-GOMcrIPVSZDTVZZeBA1mIiWDadloBsnbDELa3iwXlBmlnD7zVlJ3vs7lKM6JPOqBSK3vyzNi9h_h6WKVirOLG8bVVmiFMwewYMVoJY1YUzyNBeYF7M4xJNTmiWiMYmVX5YCKVCj_ZkP9xxxWmCQBLzwVdNUlCPYyy0orlz4M7LpnO_RmA9NVH8KNmkNtnWWTZTgMElV52DV6UQl9b5bOjU0cddajfqs"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2YTg0ZTgwMTYwN2M0Y2U2MDJhMDJmZTcyEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  },
  @{
    id = "c9bc457027394dbc80afd4355b196eaa"
    name = "07_government_services"
    title = "Government Services - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLu7gM5uzTlub6WiGSNY4mWSULT7bZaXUnmQ-bo1oe0utE9_P5lYiEwww7aQ99LJaiDSKy5W3gaWeVRBBchU_wZ0cDJni8o9nUIzt-eLIM8EKlIT456OeDS-1BdutCaXpN9CvLLChrv6X166CjvxyvFjj-4wrOktgRRGAwCPXz3g7zBsgyQ8-N4r30WBlo9uC2Xbxofq2mjF8l2ANnPCxqZmntSZk21uz22DxACoCgnrg_fjm4JTDVym2d0"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2YTgwNTAzNjQwMWE2MmYyNTNiMjg2Y2E3EgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  },
  @{
    id = "91fa9a25c4af45a7b8d36457ffa9d8b7"
    name = "08_branding_settings"
    title = "Branding & Settings - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLtCkE_EmKFeLQMfwqlMlDminNWRyZTV5nLiZRvl0aI40XjYVQqK2SHsDio1uaT6-nzgokZNsSQvpRwf90VWDq3qFxVc2BDoI7j3GsaCnMdxSh4wIqG0FvG0ckXkdSUpqIy-T8V6_8lQl0Nq5qHzm8PeP4vNz_YJPFR8nawO9hY18p-s_SQ7gJ_nP66IMQSlXxPAoszc1wWq3Bvn79mMyL2vl0Vp5DwR8oqwqXc_GGcEBHpTa9L9yyfH0CU"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2YTcwZWY3MmMwNTRjZmQxOWQwM2EzZWM2EgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  },
  @{
    id = "d41540cb6e75465695230bc9a1e038cc"
    name = "09_gallery_management"
    title = "Gallery Management - Samarth Admin"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLvc1O39cEygLEF1NyVA8nBJX51ZpSmnKfUpk9NapS-RFydnIXZyYPRtBaG7B7NGucjwg09VD5zG-h8BdXoZRMtMpQiOjub5KMXR2TSKCX6pkdaowhNZOdw2poiG2EN0e77DzBSbni9hhfsvLQAladeG4QlDq9c-9pvWLhKsSoz34fKyPmkcpMp9V6V5Eh7ErgAeeb8jXtkfRatvM9gXL8tn_pI-wvz1WgO9fGz1pXH8F28wEhANUvp57PQ"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2YTg0NWVlMTUwMDMwM2U5OGVlMTBhMTk5EgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhMyODE3ODk4ODYzMTE0MTExMjk5&filename=&opi=89354086"
  }
)

foreach ($item in $adminAssets) {
  $imgFile = "$imgDir\$($item.name).png"
  $htmlFile = "$codeDir\$($item.name).html"
  
  Write-Host "Downloading $($item.title)..."
  curl.exe -s -L "$($item.img)" -o "$imgFile"
  curl.exe -s -L "$($item.html)" -o "$htmlFile"
}

Write-Host "All Samarth Admin Stitch assets downloaded successfully!"
