import { useEffect } from 'react';

const SSEComponent = () => {
  useEffect(() => {
    const eventSource = new EventSource('http://proj.ruppin.ac.il/cgroup97/test2/api/SSE');

    eventSource.addEventListener('message', (event) => {
      const eventData = JSON.parse(event.data);
      console.log(eventData);
    });

    eventSource.addEventListener('error', (error) => {
      console.log('SSE error:', error);
    });

    return () => {
      // Clean up the SSE connection when the component unmounts
      eventSource.close();
    };
  }, []);

  return null;
};

export default SSEComponent;
