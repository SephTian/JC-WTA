export const toggleVoteThreadHelper = ({ userId, thread, type }) => {
  const isUpVoted = thread.upVotesBy.includes(userId);
  const isDownVoted = thread.downVotesBy.includes(userId);
  if (type === 'up') {
    return {
      ...thread,
      upVotesBy: isUpVoted ? thread.upVotesBy : [...thread.upVotesBy, userId],
      downVotesBy: isDownVoted ? thread.downVotesBy.filter((item) => item !== userId) : thread.downVotesBy,
    };
  }
  if (type === 'down') {
    return {
      ...thread,
      upVotesBy: isUpVoted ? thread.upVotesBy.filter((item) => item !== userId) : thread.upVotesBy,
      downVotesBy: isDownVoted ? thread.downVotesBy : [...thread.downVotesBy, userId],
    };
  }
  if (type === 'neutral') {
    return {
      ...thread,
      upVotesBy: isUpVoted ? thread.upVotesBy.filter((item) => item !== userId) : thread.upVotesBy,
      downVotesBy: isDownVoted ? thread.downVotesBy.filter((item) => item !== userId) : thread.downVotesBy,
    };
  }

  return thread;
};

export const toggleVoteCommentHelper = ({ userId, comment, type }) => {
  const isUpVoted = comment.upVotesBy.includes(userId);
  const isDownVoted = comment.downVotesBy.includes(userId);
  if (type === 'up') {
    return {
      ...comment,
      upVotesBy: isUpVoted ? comment.upVotesBy : [...comment.upVotesBy, userId],
      downVotesBy: isDownVoted ? comment.downVotesBy.filter((item) => item !== userId) : comment.downVotesBy,
    };
  }
  if (type === 'down') {
    return {
      ...comment,
      upVotesBy: isUpVoted ? comment.upVotesBy.filter((item) => item !== userId) : comment.upVotesBy,
      downVotesBy: isDownVoted ? comment.downVotesBy : [...comment.downVotesBy, userId],
    };
  }
  if (type === 'neutral') {
    return {
      ...comment,
      upVotesBy: isUpVoted ? comment.upVotesBy.filter((item) => item !== userId) : comment.upVotesBy,
      downVotesBy: isDownVoted ? comment.downVotesBy.filter((item) => item !== userId) : comment.downVotesBy,
    };
  }

  return comment;
};
