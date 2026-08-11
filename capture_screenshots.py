import asyncio
import os
from playwright.async_api import async_playwright

OUTPUT_DIR = r"d:\Samarthcomputers\docs\project-presentation\screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()

        print("Navigating to Home...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "01-home-hero.png"))

        # Scroll down slightly for catalog view or click courses
        print("Capturing Courses Page...")
        # Check if course nav link exists
        courses_btn = page.locator("text=Courses").first
        if await courses_btn.is_visible():
            await courses_btn.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(OUTPUT_DIR, "02-courses-catalog.png"))

            # Click view details on first course
            view_btn = page.locator("button:has-text('View Details'), button:has-text('तपशील पहा'), button:has-text('Syllabus')").first
            if await view_btn.is_visible():
                await view_btn.click()
                await page.wait_for_timeout(1000)
                await page.screenshot(path=os.path.join(OUTPUT_DIR, "03-course-details-modal.png"))
                # Close modal if escape or close button
                close_btn = page.locator("button:has-text('Close'), button:has-text('बंद करा')").first
                if await close_btn.is_visible():
                    await close_btn.click()

        print("Capturing CSC Services Desk...")
        csc_btn = page.locator("text=CSC Services, text=शासकीय सेवा").first
        if await csc_btn.is_visible():
            await csc_btn.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(OUTPUT_DIR, "04-csc-services-desk.png"))

            doc_btn = page.locator("button:has-text('Required Documents'), button:has-text('कागदपत्रे'), button:has-text('Checklist')").first
            if await doc_btn.is_visible():
                await doc_btn.click()
                await page.wait_for_timeout(1000)
                await page.screenshot(path=os.path.join(OUTPUT_DIR, "05-doc-checklist-modal.png"))

        print("Capturing Faculty...")
        faculty_btn = page.locator("text=Faculty, text=शिक्षक").first
        if await faculty_btn.is_visible():
            await faculty_btn.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(OUTPUT_DIR, "06-faculty-grid.png"))

        print("Capturing Timetable...")
        timetable_btn = page.locator("text=Timetable, text=वेळापत्रक").first
        if await timetable_btn.is_visible():
            await timetable_btn.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(OUTPUT_DIR, "07-batch-timetable.png"))

        print("Capturing Verification Portal...")
        verif_btn = page.locator("text=Verification, text=प्रमाणपत्र पडताळणी").first
        if await verif_btn.is_visible():
            await verif_btn.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(OUTPUT_DIR, "09-student-verification.png"))

        print("Capturing Contact Page...")
        contact_btn = page.locator("text=Contact, text=संपर्क").first
        if await contact_btn.is_visible():
            await contact_btn.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(OUTPUT_DIR, "10-contact-and-map.png"))

        print("Capturing Admin Login & Dashboard...")
        admin_btn = page.locator("text=Admin Login, text=अ‍ॅडमिन").first
        if await admin_btn.is_visible():
            await admin_btn.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(OUTPUT_DIR, "11-admin-login.png"))

            # Fill login details
            email_input = page.locator("input[type='email'], input[placeholder*='email'], input[placeholder*='ईमेल']").first
            pwd_input = page.locator("input[type='password']").first
            submit_btn = page.locator("button[type='submit'], button:has-text('Login'), button:has-text('लॉगिन')").first

            if await email_input.is_visible() and await pwd_input.is_visible():
                await email_input.fill("pawansingh3760@gmail.com")
                await pwd_input.fill("Pavan@1137")
                await submit_btn.click()
                await page.wait_for_timeout(2000)
                await page.screenshot(path=os.path.join(OUTPUT_DIR, "12-admin-overview.png"))

                # Capture sidebar expanded
                settings_btn = page.locator("text=Settings & Config, text=सेटिंग्ज").first
                if await settings_btn.is_visible():
                    await settings_btn.click()
                    await page.wait_for_timeout(1000)
                    await page.screenshot(path=os.path.join(OUTPUT_DIR, "15-admin-sidebar-redesign.png"))

        # Mobile Viewport
        print("Capturing Mobile Responsive Viewport...")
        mobile_page = await browser.new_page(viewport={"width": 375, "height": 812})
        await mobile_page.goto("http://localhost:3000", wait_until="networkidle")
        await mobile_page.wait_for_timeout(1000)
        # Open mobile drawer
        menu_btn = mobile_page.locator("button[aria-label='Toggle menu'], button:has-text('Menu'), svg.lucide-menu").first
        if await menu_btn.is_visible():
            await menu_btn.click()
            await mobile_page.wait_for_timeout(500)
        await mobile_page.screenshot(path=os.path.join(OUTPUT_DIR, "17-mobile-responsive-ui.png"))

        await browser.close()
        print("All screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(capture())
