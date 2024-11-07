export async function getBlogData({title, category,description}: Blogdata) {
      const loggedContent = `entered data: ${title} ${category} ${description}`;
      console.log(loggedContent);
      return loggedContent;
    }