import { Button } from '@o2pluss/o2pluss-design-system';
import React from 'react';

export default function Page() {
  const [count, setCount] = React.useState(0);

  const onClickCountUp = () => {
    setCount(count + 1);
  };
  const onClickCountDown = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>o2pluss template</h1>
      count: {count}
      <div className="flex gap-sm">
        <Button size="sm" onClick={onClickCountUp}>
          count up
        </Button>
        <Button size="sm" onClick={onClickCountDown}>
          count down
        </Button>
      </div>
    </div>
  );
}
