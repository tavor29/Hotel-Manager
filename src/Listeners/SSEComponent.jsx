import { useEffect, useState } from "react";

const useSSEListener = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource('http://proj.ruppin.ac.il/cgroup97/test2/api/SSE');
console.log("connected")
    eventSource.addEventListener('message', (event) => {
      const eventData = JSON.parse(event.data);
      console.log(eventData);
    });

    eventSource.addEventListener('error', (error) => {
      console.log('SSE error:', error);
      // Handle SSE errors and attempt to reconnect
      eventSource.close();
      setCount((prevCount) => prevCount + 1);
    });

    return () => {
      eventSource.close();
    };
  }, [count]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};

export default useSSEListener;
