import React, { useEffect, useState } from 'react';
import './CommentsHistory.css';

function CommentsHistory() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const email = localStorage.getItem('email');
                const response = await fetch(`http://localhost:8088/enquiries/user/${email}`);
                const data = await response.json();
                if (response.ok) {
                    setComments(data.data || []);
                } else {
                    throw new Error(data.message || 'Failed to fetch comments');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;

    const renderReplies = (responses) => (
        responses.map(response => (
            <div key={response.id} className='reply-box mt-4'>
                <div className='d-flex flex-start'>
                    <span className='response-icon me-3'>→</span>
                    <div className='flex-grow-1 flex-shrink-1'>
                        <div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-1'>
                                    {response.user || 'N/A'} 
                                    <span className='small'>- {new Date(response.date).toLocaleDateString()}</span>
                                </p>
                                <a href='#!'>
                                    <span className='small response-text'>reply</span>
                                </a>
                            </div>
                            <p className='small mb-0'>{response.comments || 'No response'}</p>
                        </div>
                        {response.responses && response.responses.length > 0 && (
                            renderReplies(response.responses)
                        )}
                    </div>
                </div>
            </div>
        ))
    );

    return (
        <section className='gradient-custom'>
            <div className='container my-5 py-5'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-12 col-lg-10 col-xl-8'>
                        <div className='card'>
                            <div className='card-body p-4'>
                                <div className='row'>
                                    <div className='col'>
                                        {comments.length > 0 ? (
                                            comments.map(comment => (
                                                <div key={comment.enquiries.id} className='comment-box'>
                                                    <div className='d-flex flex-start'>
                                                        <span className='response-icon me-3'>→</span>
                                                        <div className='flex-grow-1 flex-shrink-1'>
                                                            <div>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <p className='mb-1'>
                                                                        {comment.enquiries.email || 'N/A'} 
                                                                        <span className='small'>-  {new Date(comment.enquiries.date).toLocaleDateString()}</span>
                                                                    </p>
                                                                </div>
                                                                <p className='small mb-0'>-- {comment.enquiries.comments || 'No comments'}</p>
                                                            </div>
                                                            <div className='replies-container'>
                                                                {comment.responses && comment.responses.length > 0 ? (
                                                                    renderReplies(comment.responses)
                                                                ) : (
                                                                    <p className='small text-muted'>No responses found.</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No comments found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CommentsHistory;
