import axios from 'axios';

export default class PostsService {
  static async getAllPosts() {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts?_limit=10',
    );

    return response;
  }
}
