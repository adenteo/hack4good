import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from './ui/badge';

const AutoTaggerInput: React.FC = () => {
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const debouncedHandleChange = useCallback(debounce(handleChange, 500), []);

  useEffect(() => {
    const makePostRequest = async () => {
      if (text.length < 20) return;
      try {
        const response = await fetch('/api/classify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text }),
        });
        const data = await response.json();
        setTags(data.tags.map((tag: string) => tag.toLowerCase()));
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

    if (text) {
      makePostRequest();
    }
  }, [text]);

  return (
    <div>
      <Textarea
        id="description"
        className="mt-6"
        placeholder="Describe the activity details"
        onChange={debouncedHandleChange}
      />
      <div className="mt-6">
        {tags.map((tag, index) => (
          <Badge key={index} className="mx-2">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default AutoTaggerInput;
