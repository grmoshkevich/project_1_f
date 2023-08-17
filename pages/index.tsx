import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from "react";
import { FormEvent } from 'react'; // Import the FormEvent type

type Rule = {
  id: number;
  upvotes: number;
  downvotes: number;
  content: string;
  votes: {
    voteType: 'upvote' | 'downvote';
    // Other properties related to votes if needed
  }[];
};

const Home: NextPage = () => {
  const [isCreating, setCreating] = useState(false);
  console.log('%c⧭', 'color: #e57373', 'isCreating', isCreating);
  const [rules, setRules] = useState<Rule[]>([]);
  console.log('%c⧭', 'color: #917399', 'rules', rules);

  async function fetchPosts() {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch('/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        }
      });
      if (response.ok) {
        setCreating(false)
        const data = await response.json();
        setRules(data);
      } else {
        console.error('Failed to fetch posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  
  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('%c⧭', 'color: #d90000', 'xcv');
    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch('/api/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify({ content: newPostText, title: 'not set' }), // You can initialize count as needed
      });

      if (response.ok) {
        const newPost = await response.json();
        // setRules([...rules, newPost]); // Update the rules state with the new post
        setNewPostText(''); // Clear the input field
        fetchPosts(); // Fetch the updated data after creating the post

      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleVote = async (postId: number, voteType: 'downvote' | 'upvote') => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/vote`, { // Update the endpoint and path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ voteType, postId }), // Send the voteType in the request body
      });

      if (response.ok) {
        fetchPosts(); // Fetch the updated data after voting
      } else {
        console.error('Failed to vote:', response.statusText);
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };



  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-4 md:py-20">
      <Head>
        <title>Comstitution</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center py-6 px-4 md:px-20 text-center">
        <h1 className="text-6xl font-bold">
          Open Source Constitution
        </h1>

        <p className="mt-3 text-2xl">
          Curated by the community in&nbsp;real&nbsp;time
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div
            className="mt-6 w-full rounded-xl border p-4 md:p-6 text-left flex cursor-pointer hover:outline outline-green-400" onClick={() => setCreating(true)}
          >
            {!isCreating ? (
              <div className="w-full flex justify-around">
                <div className="flex flex-col justify-around">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div className="w-full flex flex-col justify-around ml-2.5">
                  Create a new opinion
                </div>
              </div>
              ) : (
              <div className="w-full flex flex-col justify-around">
                <form onSubmit={handleCreatePost}>
                    <textarea placeholder="Put your rule here..." rows={1} className="w-full border outline-zinc-800 p-2.5"
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}></textarea>
                  <div className="flex justify-around self-end mt-2.5">
                    <button type="submit" className="rounded-xl border py-2.5 px-3.5 outline outline-green-400">Create</button>
                    <button type="button" className="rounded-xl border py-2.5 px-3.5 ml-3.5 outline outline-red-400" onClick={(e) => {e.stopPropagation(); setCreating(false)}}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

          </div>

          {rules.map((rule, index) => (
            <div key={rule.id}
              className="mt-6 w-full rounded-xl border py-2 px-6 md:p-6 text-left flex"
            >
              <div className="flex flex-col justify-around w-4">
                {rule.upvotes - rule.downvotes}
              </div>
              <div className="flex flex-col justify-around ml-1.5">
                <div className="cursor-pointer" onClick={() => {
                  handleVote(rule.id, 'upvote')
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={rule.votes[0]?.voteType === 'upvote' ? "green" : "currentColor"} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </div>
                <div className="cursor-pointer" onClick={() => handleVote(rule.id, 'downvote')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={rule.votes[0]?.voteType === 'downvote' ? "red" : "currentColor"} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col justify-around ml-2.5">
                {rule.content}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="flex h-12 md:h-24 w-full items-center justify-center border-t">
        Repository of current opinions
      </footer>
    </div>
  )
}

export default Home
