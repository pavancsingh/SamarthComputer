# PowerShell script to download all Stitch Admin Dashboard assets
$adminDir = "d:\Samarthcomputers\stitch_assets\admin"
$codeDir = "$adminDir\code"
$imgDir = "$adminDir\screenshots"

if (-not (Test-Path $codeDir)) { New-Item -ItemType Directory -Path $codeDir -Force }
if (-not (Test-Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir -Force }

$items = @(
    @{
        name = "admin_dashboard_workflow.md"
        codeUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBKOARIhYXBwX2NvbXBhbmlvbl91c2VyX3VwbG9hZGVkX2ZpbGVzGmkKM3VzZXJfdXBsb2FkZWRfaHRtbF8wMDA2NTg4MmY2OWY3NjdlMDFhNjAzZThkNjM5YjBhORILEgcQi9Du1bEWGAGSASQKCnByb2plY3RfaWQSFkIUMTY0OTIxOTM0NjY5MDM5MTUwNDQ&filename=&opi=89354086"
        codeFile = "$codeDir\admin_dashboard_workflow.md"
    },
    @{
        name = "Admin Dashboard - Batch Timetable"
        codeUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ODgzMTM0NGRmOGUwMzRhNGUyMDkxMmVjMDg5EgsSBxCL0O7VsRYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjQ5MjE5MzQ2NjkwMzkxNTA0NA&filename=&opi=89354086"
        codeFile = "$codeDir\admin_dashboard_batch_timetable.html"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLtcN5aJpP35_0fPlwwa84izJGLpetKaI0EI1iD5L8G-ussZ4JV15sj_6xMErSrxD_gWAUQySwFyLGwuRJkXDU6zS8NUPoE2Z4eO60nYq7yzFozhMt5gVCfxEbN5YYg15h72ZW5ODUUPRlG0LeQkWjQlG-fRG6YS2JaB4Zbaob9lvoC9XH-6bj1jz8goM7QdYE7-JEwtvK2ILwVVnzFb-s-p8gzaGpMdHKcWmZYinwnj9W7DwnNSGOs7AeN3"
        imgFile = "$imgDir\admin_dashboard_batch_timetable.png"
    },
    @{
        name = "Admin Dashboard - Courses"
        codeUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ODgzMjExZmYyNTEwMmE5YmQ2YjMwMGQwZDhiEgsSBxCL0O7VsRYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjQ5MjE5MzQ2NjkwMzkxNTA0NA&filename=&opi=89354086"
        codeFile = "$codeDir\admin_dashboard_courses.html"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLv0KLhyXMI5aTssUylGaEmsTRWMvI6-xoQdbHU29rkBZl1VM0feCCp_gF7FpBq3fu29DXSgl_RRu8-5dru0_jNhonvWqXaQVPmNsDWLI1kq30hg24ENJkIQTWiYkwtlVuKWBfWbIN6lTjHlDSrgm9N7-3E6rjbzSBa518OJrKCtKnj3t4Y-BkHm_ef8KRNnUY8KGFO3AoD8sISAeocI29LsKxEGckLEYImJYWkrTQMMARkAC2EsrDnNA9Ca"
        imgFile = "$imgDir\admin_dashboard_courses.png"
    },
    @{
        name = "Admin Dashboard - CSC Services"
        codeUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ODgzMjI0NjJhODAwOTI1ZDNhMzU2MmQ0OTAwEgsSBxCL0O7VsRYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjQ5MjE5MzQ2NjkwMzkxNTA0NA&filename=&opi=89354086"
        codeFile = "$codeDir\admin_dashboard_csc_services.html"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLszdiMneH1bpQgugCpdkbYoitJX62h7oirm6LM_KNMV7-i_pU7O57uw9Y5H6mIc67H8sQQc3pbfOpqcQmnKbQzZqG4lKJB2Q11Lvz8Xkmh60LEZt_x86yzYZg2KfitgT51tmJDFMFEltOOzYsOLLn3Bg8ISKDtb1wbGGmfmXjGS3CZUGVs8YVmoW7eYEnMYy9oTVR-P0qXIYiF7SjEuJIHQb8P5x02uWms1hsd2Tl10BRAtIsgynpoOJRcp"
        imgFile = "$imgDir\admin_dashboard_csc_services.png"
    },
    @{
        name = "Admin Dashboard - Inbox Leads"
        codeUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ODgzMGU2NTlhYTUwMmE5YmQ2YjMwMGQwZDhiEgsSBxCL0O7VsRYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjQ5MjE5MzQ2NjkwMzkxNTA0NA&filename=&opi=89354086"
        codeFile = "$codeDir\admin_dashboard_inbox_leads.html"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLsm7Wlv-jWJUYg4ELQc9RYzsac6vFjtYJAKdZHWL_gn5FiQu7LNyizs0YobOOEn_jPv2-CD1lzJvSS3V7IapP1wRIuKFGvJPLD_W6xeOA9QAk-o5FP2RgcyDlxBIkBTjpYlw0iKgK0mAqT8yihh5svlEgwZm0Vv9pN77uYLsl9W4ZUeScJejDh0BjC_o82fGxfiKP1lNVJNXD_14bu-ZTa7fTmAFI_WfsNsonXt2B2Ef8tsPZlGqOya7OBk"
        imgFile = "$imgDir\admin_dashboard_inbox_leads.png"
    },
    @{
        name = "Admin Dashboard - Settings & Gallery"
        codeUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ODgzMTNmN2E2YmQwMzRhNGUyMDkxMmVjMDg5EgsSBxCL0O7VsRYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjQ5MjE5MzQ2NjkwMzkxNTA0NA&filename=&opi=89354086"
        codeFile = "$codeDir\admin_dashboard_settings_gallery.html"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLtfd_EmFjLq39P2bxlZmf5Xuku7RzgL9PDOfeD7-srl_fKthETmwzXmCRqCg_-VfnV39ihy7vQGvsleztmuxJgj9UTq2f8KknQQ0o6qPilMuoUgoHVMeMy0NJmXQnpGmaRoFo29-f2entN6r-CYturiYbN3_aOAVxYRz-GliPOCPMP4EKkAJguA7aacg3IIubdsiAut61O8vsSM58D87e1GflVF-zS9scRchY27ZSHjENpSVQOQYr56_nA"
        imgFile = "$imgDir\admin_dashboard_settings_gallery.png"
    },
    @{
        name = "Admin Dashboard - Faculty"
        codeUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ODgzMTQwNjI1MTUwOTI1ZDNhMzU2MmQ0OTAwEgsSBxCL0O7VsRYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjQ5MjE5MzQ2NjkwMzkxNTA0NA&filename=&opi=89354086"
        codeFile = "$codeDir\admin_dashboard_faculty.html"
        imgUrl = "https://lh3.googleusercontent.com/aida/AP1WRLsN52qk18PekT_wQXCjASq5Ve6EQP6Wj6fOFUtjeaQNlM6zF_Ff2fq837BbeYXl9saemxX45O2CGPxRZBYRKOU9AucBxfABkvuwYVCIN9Kw259Hl03hhlChdDL9uvWqS_np-h4UIRSXhBcp-WnhLlRtpKo25KNQ-y--rtAe1CueggigNyZUwKGWuaJ81pSNbKtwBtj8tzkSNPZdwVO0uP4JwMYxqQLYtZW346Y6DdRvTWAthATgiMGAFgk"
        imgFile = "$imgDir\admin_dashboard_faculty.png"
    }
)

foreach ($item in $items) {
    Write-Host "Downloading $($item.name)..."
    if ($item.codeUrl) {
        curl.exe -L -s $item.codeUrl -o $item.codeFile
        Write-Host "  -> Saved Code/Markdown to $($item.codeFile)"
    }
    if ($item.imgUrl) {
        curl.exe -L -s $item.imgUrl -o $item.imgFile
        Write-Host "  -> Saved Screenshot to $($item.imgFile)"
    }
}

Write-Host "All Stitch Admin Dashboard files downloaded successfully!"
