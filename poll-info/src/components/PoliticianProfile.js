import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PoliticianProfile = () => {
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [politician, setPolitician] = useState({});

  useEffect(() => {
    // Map id to politician name
    const politicianMap = {
      1: 'Narendra Modi',
      2: 'Rahul Gandhi',
      3: 'Mamata Banerjee',
      4: 'Amit Shah',
      5: 'Arvind Kejriwal'
    };

    const politicianName = politicianMap[id];

    const fetchBiography = async () => {
      try {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            prop: 'extracts',
            exintro: true,
            explain: true,
            format: 'json',
            origin: '*',
            titles: politicianName,
          }
        });

        const pages = response.data.query.pages;
        const page = Object.values(pages)[0];
        setPolitician({
          name: politicianName,
          bio: page.extract || 'Biography not found.',
        });
      } catch (error) {
        console.error('Error fetching biography:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: { 
            q: politicianName,
            apiKey: '9ad3ec66c403467a9e208038743820e7', // Replace with your actual API key
            pageSize: 10,
            sortBy: 'relevancy',
          }
        });

        const sortedArticles = response.data.articles.map(article => ({
          ...article,
          votes: 0,
        })).sort((a, b) => b.votes - a.votes);

        setNews(sortedArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchBiography();
    fetchNews();
  }, [id]);

  const handleUpvote = (newsId) => {
    setNews(news.map(n => n.url === newsId ? { ...n, votes: (n.votes || 0) + 1 } : n)
                .sort((a, b) => b.votes - a.votes));
  };

  const handleDownvote = (newsId) => {
    setNews(news.map(n => n.url === newsId ? { ...n, votes: (n.votes || 0) - 1 } : n)
                .sort((a, b) => b.votes - a.votes));
  };

  return (
    <div>
      <h1>{politician.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: politician.bio }} />

      <h2>News</h2>
      <ul>
        {news.map(article => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
            </a>
            <p>Votes: {article.votes || 0}</p>
            <button onClick={() => handleUpvote(article.url)}>Upvote</button>
            <button onClick={() => handleDownvote(article.url)}>Downvote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoliticianProfile;
