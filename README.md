<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- PROJECT LOGO -->
<br />
  <h3 align="center">Codingbears</h3>

  <p align="center">
    A comprehensive platform for volunteer journey management.
    <br />
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Codingbears Volunteering Management App](public/homescreen.png)

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![MongoDB][Mongodb.com]][MongoDB-url]
- [![Amazon AWS][aws.amazon.com]][Amazon-AWS-url]
- [![Python][Python]][Python-url]
- [![TailwindCSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

We've built a robust platform that includes a seamless user interface, synced to a comprehensive backend database. This application is designed to streamline the management of volunteering events and offers a suite of tools for both administrators and volunteers, simplifying the process of signing up for, creating, and managing volunteering events. Below you'll find a guide on how to utilize our features effectively.

<!-- GETTING STARTED -->

## Getting Started

You can access our live web app directly <a href="https://hack4good-alpha.vercel.app/">here</a>. No installation needed whatsoever.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Features for Admin Side

You will require an admin account to access some of the following features. Here is the credentials to log in to a pre-created admin account.

**Email:** `admin@m.com`  
**Password:** ``

### Dashboard

- **Monthly Navigation**: Interactively click through months to view the analytics of all events that took place in that month.
- **Data Overview**: Get a quick and comprehensive overview of some of the statistics such as total volunteer attendance, total hours, including comparisons from the previous month.
- **Data Visualization**: Hover over pie charts to reveal detailed statistics on volunteer participation by region and gender.
- **Monthly Reports**: Easily download comprehensive monthly reports with a single click, providing insights into volunteer activities and engagements.

![Dashboard Screenshot](src/assets/dashboard.png)

### Form Builder

- **Create New Forms**: Design custom forms tailored to your event's needs, from volunteer sign-up sheets to feedback forms.
- **Customizable Questions**: Add, remove, and reorder questions to ensure your form collects all the necessary information.
- **Form Management**: Save new forms for future use and select from existing forms to edit or repurpose them.

![Form Builder Screenshot](src/assets/formbuilder.png)

### Forms

- **Efficient Search**: Quickly locate forms using the search feature, including the newly created forms.
- **Edit Forms**: Revisit and modify forms as needed, ensuring they remain up-to-date and relevant.
- **Form Preservation**: Save changes to forms, maintaining a current and accessible form library.

![Forms Screenshot](src/assets/form.png)

### Activities

- **Advanced Filtering**: Utilize filters to sort activities by date, volunteer count, and status, making it easier to find specific events.
- **View Functionality**: Adjust view settings to tailor the display of activities to your preferences.
- **Activity Management**: Edit activity details, link activities to specific forms, and conduct searches for activities using keywords.

![Activities 1 Screenshot](src/assets/activities1.png) ![Activities 2 Screenshot](src/assets/activities2.png)

### New Activity

- **Create**: Allows activity to be created and published
  ![Volunteers 1 Screenshot](src/assets/activitycreation.png)
- **Auto Tagging**: Generates automated tags to catergorize activities based on activity description given
  ![Volunteers 1 Screenshot](src/assets/autotagging.png)

### Volunteers

- **Sorting and Filtering**: Sort volunteers using various criteria and filter by status and gender for targeted management.
- **Comprehensive Search**: Find volunteers by name, streamlining the process of accessing volunteer profiles.
- **Volunteer Profiles**: View detailed volunteer information, including participation history and personal details.

![Volunteers 1 Screenshot](src/assets/volunteers1.png) ![Volunteers 2 Screenshot](src/assets/volunteers2.png) ![Volunteers 3 Screenshot](src/assets/volunteers3.png)

## Features for Volunteer Side

### Onboarding

- **Verified Volunteer Creation**: Ensures volunteers undergo a verification process to maintain the integrity and credibility of the platform before gaining access to activity registration.
- **Auto Tagging**: Automatically generates categorical tags based on volunteers' self-described interests, facilitating streamlined activity recommendations and personalization.

<div style="display: flex; justify-content: space-between;">
    <img src="src/assets/loginform.png" alt="Login Screenshot" width="300">
    <img src="src/assets/unverified.png" alt="Unverified Screenshot" width="300">
</div>

### Explore Page

- **Featured Section**: Provides volunteers with the opportunity to view and register for high-demand activities.
- **For You Section**: Tailors activity recommendations based on volunteers' specified interests during the verified volunteer registration process.
- **Featured Section**: Displays a comprehensive list of upcoming events for which volunteers have successfully registered.

![Explore Page Screenshot](src/assets/explorepage.png)

### Individual Activity Listing

- **Details**: Presents essential event details for volunteers to stay informed.
- **Register**: Facilitates the registration process for the chosen activities.
- **Withdraw**: Enables volunteers to withdraw from a registered activity.
- **Contact Us**: Offers a way for volunteers to connect with event organizers.

<div style="display: flex; justify-content: space-between;">
    <img src="src/assets/register1.png" alt="Register Screenshot 1" width="300">
    <img src="src/assets/register2.png" alt="Register Screenshot 2" width="300">
    <img src="src/assets/withdraw.png" alt="withdraw Screenshot 1" width="300">
</div>

![Contact us Screenshot](src/assets/contactus.png)

### Profile Page

- **Past Events**: Displays a record of volunteers' past activities, allowing them to provide valuable feedback on each event.
- **Certificate**: Showcases a collection of certificates earned by volunteers, providing an option to download each certificate individually by simply clicking on them.
- **About Me**: Allows volunteers to keep their information up-to-date.

<div style="display: flex; justify-content: space-between;">
    <img src="src/assets/profile.png" alt="Profile Screenshot" width="300">
    <img src="src/assets/pastevents.png" alt="Past Events Screenshot" width="300">
    <img src="src/assets/feedback.png" alt="Feedback Screenshot" width="300">
</div>

<div style="display: flex; justify-content: space-between;">
    <img src="src/assets/certs.png" alt="Certificates Screenshot" width="400">
    <img src="src/assets/aboutme.png" alt="About Me Screenshot" width="400">
</div>

### Blogs

- **Blog Posts**: Allows volunteers to read and contribute to a collection of feedback and reflections from other volunteers, fostering a sense of connection.

<div style="display: flex; justify-content: space-between;">
    <img src="src/assets/blog1.png" alt="Blog Screenshot 1" width="400">
    <img src="src/assets/blog2.png" alt="Blog Screenshot 2" width="400">

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Shadcn](https://ui.shadcn.com/)
- [HuggingFace](https://huggingface.co/)
- [NextJS](https://nextjs.org/)
- [Img Shields](https://shields.io)
- [Lucide](https://lucide.dev/)
- [React Icons](https://react-icons.github.io/react-icons/search)
- [DaisyUI](https://daisyui.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Mongodb.com]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Aws.amazon.com]: https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white
[Amazon-AWS-url]: https://aws.amazon.com/
[MongoDB-url]: https://www.mongodb.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
