const mediaTypes = {
  news: {
    endpointHost: 'microsoft-azure-bing-news-search-v1.p.rapidapi.com',
    endpointSearchHost: 'microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?q=',
    endpointKey: '2ca25813c0msh9db483c3530c143p1009bdjsnde50b6575cf1',
  },
  music: {
    endpointHost: 'https://rss.itunes.apple.com/api/v1/${country}/${media}/${genre}/all/${limit}/explicit.json',
    endpointSearchHost: '',
    endpointKey: '',
  },
};

export default mediaTypes;
