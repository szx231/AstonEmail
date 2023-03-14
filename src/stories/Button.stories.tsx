// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      type: 'string',
      description: 'Тестируем как работает описание!',
      defaultValue: 'Andersen',
      options: ['Andersen', 'Aston'],
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Andersen = Template.bind({});
Andersen.args = { title: 'Andersen' };

export const Aston = Template.bind({});
Aston.args = { title: 'Aston' };
