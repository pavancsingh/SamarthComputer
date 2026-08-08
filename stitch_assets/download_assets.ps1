# PowerShell script to download Samarth Computers Main Website (Stitch Project 7436856466966593434) assets

$imgDir = "d:\Samarthcomputers\stitch_assets\screenshots"
$codeDir = "d:\Samarthcomputers\stitch_assets\code"

if (!(Test-Path -Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir -Force }
if (!(Test-Path -Path $codeDir)) { New-Item -ItemType Directory -Path $codeDir -Force }

$assets = @(
  @{
    id = "a0aee09d2dbe411d8a9a4105d4dd770b"
    name = "01_csc_services_nav"
    title = "CSC Services (Updated Navigation)"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLtptUPD3LlsbMtdenPqT9FBHsvUZDocYXVx4dkv9YLFzRyDoL-VC4Qa5kZBDq0gXJ9rBNSGMq2bEq7QAkwnJ5Ml5MMaMALdM726Y2Ec4qphjLT1EuPCmFp_JxYswEaP6s8JbEUlH8qQVK-JZKMHYDCOBUq5ahrasK0RhMq-8oXz16k6anKC0y-TRBQQvkstxAq0PARDXfigfQ5_TlfK1U1OhEUo0tXDV_0VaZLN7mA-cyYgAyAIRVlc23o"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWJkY2QwM3YwMWE2MDNlOGQ2MzliMGE5EgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "99849cad7cef42abb6df74ac14eb923e"
    name = "02_success_stories"
    title = "Success Stories | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLtGAfaL9tr0wusD_0KWFlGrE5g7YkmeXOf-XoIiFuUKrgMIAdl7zCys7UPLlkCIgZ3t1dSG3i8BBVLAnL_dU_QejWLOWDQNAXXon8y40pnR5i6h3kiO8PTYTTZbgVPkJxAUGrOPPqWY0DdDJApAIqDu08UaGHijJjd8zrz5AEV09q_Eoqumn-c4aNjOhpcan71l2i4F3NtkZM1fvmBBiD5Difr8EvZQNir-DpNLsNVW_MvKhwS6HLmDIA"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MGM2NmFjZjUwNzA5Mjk4NDVlMTA4ZmE5EgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "6bf41e6e35cd481db757efa53fb71aee"
    name = "03_workshops_events"
    title = "Workshops & Events | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLsIs3DxGaupo7j5zne2t7n_KzXQdmbXEUlc4ys-OcSMxESZYW51udN1059CxqE0ieGu9toZ7ftIHkNaP_hiFOGon0YFEnT7LbugO9L7_-jHEVpOEm6gSh7oBW5tbM0mZdP4sNqzs7uJvsP5IFxsTJOttnmHJQPsVnv6HJqWYmf-v4hp4VCNt89CxBmmDLShZcoSq_QhBLaGDPuNKg_Aqri_Y0PVHgwB7YlT1LwGuJU2n17AcgqU4I0GVDA"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MGM3ZTgzZTIwN2M0Y2ExMDFlMWVmNjI4EgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "598a2e8f8fc84533bbd5f43d904a4b73"
    name = "04_contact_us_nav"
    title = "Contact Us (Updated Navigation)"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLvbHK5ghyUVr1mUOJEAqEKOH6xJ_NqrqDuj29pElheaFELQIBPmzDMAguIU71mweEPHxmXabMPmsXj84z8AB4XhRPC7I7bdgO5ESt4waEm33PFqFTwGUSfSVnxWWgdBwMNzBYqM3pktMeeopY5CrEIG9bIOZSYgILEWBqLi1v2IqGSppmgk_XIDWzO_IOiJ5_Om6QfcsX2LClQGAA-nhpnMVOCVn8hJfg3K1y9n0DsnD4OzGTdINddOae8"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWJjNGZhMzgwMzgzOGNkM2EyMzNiNjRkEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "7699556cc10c431485a4489af207aa1d"
    name = "05_samarth_redesign_nav"
    title = "Samarth Computers | Redesign (Updated Navigation)"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLspXCFmACq5UVPe5FxVOxxK0D1aACVlW1gj_7rv-dBlT5bBt7mvVrRSqY51iZNHgk7mDl3E0MMgJ26nXDAYxPwVOqvrblGkzHamX-dcRcAKDzBzsqmdrRNb0mpjoO0d-yPFu4YpJHraNrDd_bUGFazbnUaRGecoj3YF8FhmnP4et0XMLpv4XCUq3mHXcTmg33gqFg-jWALQ4fScdVaMcT3KaZDA_UKoW5bc2w3YuWeHHswkBm49W6-1qLA"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWNkYzZhZDAwMDMwMzUxMDUwMmVmMWRiEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "4521a8fe4505422f99b191e3e342bb0d"
    name = "06_meet_our_faculty"
    title = "Meet Our Faculty | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLu_L8mNFjUlZ2xC4eY4KBalK0D_E_BOW-geRg4b0SEiJ6y_HNpI0BKV6HPZ-qPUlPKsIevqB8bKMUZcwQCmZx__u2yMx4QsxbNwqVNdWwj6tTFC2YiBN6u_fWqvJ0y930VkGu---GexsiFLKZCUwFfY_voszy5LaEBRytxShb0MBHbcgDEFmIuxAit07y2UlDquAr3WhMp2K5BUtVMpkfYRJniYN3r6LU8C2ttfVRMaSEHkHfkj-MidFCI"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MGJlY2MzMTgwOTI1ZDQwMDhmMjIyYjRlEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "b155fd1c15704296a421246f4edd8c73"
    name = "07_all_courses"
    title = "All Courses | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLueTj9V8AbBnghrtBxi0ICGsAqOd_gF41CdEbIcIf44fuOrUP-fLjp3ODR8_f2wMjbdSTpNhaXZVT2RaNx6q4HvG2QCaabCbkaOIlLb28uI7VSlM8F6ESFlqddrqSOpgDTrDhoGHHisPeQvdgAsfAHlPHmSJVX4wpRfGEwBFukP8aMnB8tdzuxWFNEvfUAXW4yaNO9WuuuGrY-4Pu9EtXlLkgPFwKhYbMCF2oiV8MY5An36cjuQaOJKDg"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWFlNGUxNDUwN2M0Y2U2MDJhMDJmZTcyEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "8d1f1492d837495e993cc79c1be62215"
    name = "08_immersive_animated_experience"
    title = "Samarth Computers | Immersive Animated Experience"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLuCwaPurkszWfFht2nM5j90ijTqfHTw69nMHrSMj2Lc98ot__OjCkc1Unyf9kKgakkH8KzajJWWQBI6wqBhfirHZxQKGLklBpFMhbqlFpvPZbnf5qLv7dzu4Ymv81fuXd_rg54lcGu5Q5zrQIJf9Yr2rIeLFI_09SEb0oG0mJELjpIWJewyhI6BH6sdl8PR1mdUFXK7o1xhSPhyd22gieijfuyjEspv8ymEOhBI7kCjp_JeXVjQ7M1Q4A"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MmE4NDNkZDQwMWE2MTEwMGFiMzU4MmUzEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "1dbbfb1d8ed247de9bba85c581d23e0a"
    name = "09_mscit_course_details"
    title = "MS-CIT Course Details | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLugOanhpGyT-23cTQQPcyAi8H0yaSa5pDhbzI8ap4EAGDBl6YU6Vpg0CfsDsXfnrzty2nMHGd7ZC3fpOAnc31wdCQ164p7awyqELPRtjeXm4j5BLdfKktz_ed6DAGt5JNfF-y574uLXZxdMbl3MlmrMOkb3nEsuLPvtt4RQMtF0kp90iwYnfLEAejTbI1t29HW8KPk3gzRMzdBK_z56M00p4_WatWOAxBtAH3_6e622IrGcxqbDKsT66w"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWFiZTRhYWIwMmE5YmQ2YjMwMGQwZDhiEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "272187fbead2405cb10eee466eca5b49"
    name = "10_mscit_details_nav"
    title = "MS-CIT Details (Updated Navigation)"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLvQNIOTaej1MYIpXF9Dx2xjEn5V3vAkbRIFOtD5mFiQLrWw4kYXBf-Rpn_BRTQjiBfvvOGjffIg7s0TK4V8vept4FQMRf_gIKWEKXcXvLhXsVhnpozSkCoIMRXk7iQwlTc5IgEJzGuADYq0Puz_MjhqLzchHrgu8Z5hxPpyaiVUQTCm_0dBb8rJfTLEXVPluwLlAX7lmkIsgIFdK03EAPx7Q7rfWXP8TmsWN5BA9QmTel62oM0sHW8DZwU"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWJjZTI2ODcwNTRjZmQxOWQwM2EzZWM2EgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "98b636894c5c489ea8b11c15729f059c"
    name = "11_about_us"
    title = "About Us | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLvcdkJ4DpeCADZT_ayRzqMU4yQFEisKwO3oBh7kSxCy2vgghmWXrAgNunY4WPuaF6f8M4xYbGEQTs0K-p9fSS9Qk2SsZLcHkbcDo-jEcx1PUz2u4rPz6EV6W5JN1an7n2mu7QUlhglNXz6jKhBXHqo1KyIWWLDYe2slgGJ-CnU9Igzu6MwbyXK7F5dVAOaV3R5OfGFPHtWftPFvGlOggGRTd7a_zRv-uStPJdynI2-1Y0EPB2pPbqPhtAQ"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MTk2N2M0YzMwN2M0Yzk1ZGZjMDk0ZDFiEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "affccdf2c8ff4827bbf6812a32039d51"
    name = "12_all_courses_nav"
    title = "All Courses (Updated Navigation)"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLskAaRRyEK9bXXvk-L2iDHN6Iwrbe0IDmQqSyjhJcytUTV7tKA-HEFCL_4XHu2YCAO0_goBiC0AhyZA3IAC9DhG6GEs4LVf7rEOYJUg7Fcjd_QoFBy_SvuxztVNfQ6OY8zUNg5K4RaVjx9U5IlgT_Vt4X0sHVXcMUviNvFpCGZCizsNgHXzVqJYp4z0mxN1LjWxb00aQsqxurM0EzAsKWQWO8RzhchPNsvcIyfw0O0Lollt1EPs_iY-u5I"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWJlODcwMzEwMWE2MTEwMGFiMzU4MmUzEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "b80d6ed3524e49c3a742785da4e83b93"
    name = "13_csc_govt_services"
    title = "CSC & Government Services | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLuwA_xyPJSY9ibK__lTYhNmMFlqE-o7V3e-mT_G9vZzwFsTBWCXO-UvJN26VJ1JUbIF8f3XUZIA_oVgtHUqYalp7omPjzxpu9KyyM_TPhQ7wKDN4Oz_ocOvG7ofCmyR9mNSSz_8yPMTngssAt9zhw1EH8ymwIJNqtbckHG6vvVF26fW2OzZ12QQ5nF4O-a5Xm1otSiQzyN4pGcXoa2qGdBNyy4Hw7xXBmuOcZBk0I5V5FFxMToIAstkzFU"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWFkMWNhMTEwN2M0Y2U2MDJhMDJmZTcyEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "616a9cba552b4ebfb651a7d01a71128a"
    name = "14_contact_us"
    title = "Contact Us | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLtgDrx4pS0wgITUvGTJmMrPgh5m-dhuvS7mf_lq2EfGZazHyLXhciJu34-zATdLB2vj-H3fbrOCXf0welRP2JSPyuA80iqJtq58gDNfLkrnykdpGd01yIRndSdT5k4FJKJKoPVfxUTU2OjrHvlwYxQ34bg1z99BvJU8TIJrdbyruU9qe0EAmSlytPwdm4UydSkUDuFbLSIXahop8yABy_WEbQekQMW2LF0IqnfJBh3LULTR0ahcFFA3sQ"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MWFhZTJlMWQwNTc2MzFlOThhMGEzY2NkEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  },
  @{
    id = "26a7b57b301b46a788b8907e97ca840d"
    name = "15_batch_timetable"
    title = "Batch Timetable | Samarth Computers"
    img = "https://lh3.googleusercontent.com/aida/AP1WRLtvlkkSYqxUlLnuICwOALp-1sZ0xQjBTFf90KJyCkTC55mx2aYuOt5SixZOSma3SXvP0UTas4MvuqUSUaMl-yYTYsm97M1KSzOURGTyhyLSFBOpZd76dmDmCnaZlRqsXQ0sr6N6RtTSRqNjI_gXm3DhaXpCr-sHTyvcqLWnKyM5LaoCkyp53szTg4Io21Jb4jqOCVkJLwFQ3NjN0N07TzqpdTSniJLCKgkiJ2v4Fi4qtnDDvzUw2zcRnJk"
    html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODc2MGJiOWY4NWYwN2M0ZTUyNTA3MTRiMWMxEgsSBxCL0O7VsRYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NDM2ODU2NDY2OTY2NTkzNDM0&filename=&opi=89354086"
  }
)

foreach ($item in $assets) {
  $imgFile = "$imgDir\$($item.name).png"
  $htmlFile = "$codeDir\$($item.name).html"
  
  Write-Host "Downloading $($item.title)..."
  curl.exe -s -L "$($item.img)" -o "$imgFile"
  curl.exe -s -L "$($item.html)" -o "$imgFile.html" # download html correctly
  curl.exe -s -L "$($item.html)" -o "$htmlFile"
}

Write-Host "All 15 Main Website Stitch assets downloaded successfully!"
