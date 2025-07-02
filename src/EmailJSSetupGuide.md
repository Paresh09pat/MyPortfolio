# Setting Up EmailJS for Contact Form

Follow these steps to set up the contact form to send emails to your email address:

## Step 1: Create an EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. The free tier provides 200 emails per month, which should be sufficient for a personal portfolio

## Step 2: Add an Email Service
1. In the EmailJS dashboard, go to "Email Services" → "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the authentication steps and connect your email account
4. Give your service a name and note the **Service ID** (you'll need this later)

## Step 3: Create an Email Template
1. Go to "Email Templates" → "Create New Template"
2. Design your email template with the following variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
3. Save the template and note the **Template ID** (you'll need this later)

## Step 4: Get Your Public Key
1. Go to "Account" → "API Keys"
2. Note your **Public Key** (you'll need this later)

## Step 5: Update Your Code
1. Open the file `src/components/Contact.jsx`
2. Find the EmailJS initialization section at the top of the component:
```javascript
useEffect(() => {
  // Initialize EmailJS with your public key
  // emailjs.init("YOUR_PUBLIC_KEY");
}, []);
```
3. Uncomment the `emailjs.init()` line and replace `"YOUR_PUBLIC_KEY"` with your actual public key

4. Find the `emailjs.sendForm()` function call in the `handleSubmit` function:
```javascript
emailjs.sendForm(
  'YOUR_SERVICE_ID', // Visit emailjs.com to get your Service ID
  'YOUR_TEMPLATE_ID', // Create a template with fields: name, email, subject, message
  formRef.current,
  'YOUR_PUBLIC_KEY' // Get your Public Key from emailjs.com dashboard
)
```
5. Replace the placeholders with your actual IDs:
   - `'YOUR_SERVICE_ID'` → Your Service ID from Step 2
   - `'YOUR_TEMPLATE_ID'` → Your Template ID from Step 3
   - `'YOUR_PUBLIC_KEY'` → Your Public Key from Step 4

6. Save the file

## Step 6: Test the Form
1. Run your application (`npm run dev`)
2. Go to the Contact page
3. Fill out the form and submit it
4. You should receive an email at the address you configured in EmailJS

## Troubleshooting
- If you still see the "EmailJS not configured" error, make sure you've replaced all three placeholder values
- Check the browser console for more detailed error messages
- Verify that your EmailJS account is active and that you haven't exceeded the free tier limits 