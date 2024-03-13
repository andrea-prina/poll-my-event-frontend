import { FormEvent, useState } from 'react';

function ActivityForm() {
  const [activityData, setActivityData] = useState({
    title: '',
    description: '',
    location: '',
    startTimestamp: 0,
    endTimestamp: 0,
    maxParticipants: '',
    pollDeadline: 0,
    pollOptions: [],
  });

  const submitActivity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(activityData);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  return (
    <>
      <form
        onSubmit={submitActivity}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}
      ></form>
    </>
  );
}
