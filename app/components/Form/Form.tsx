import { BaseSyntheticEvent, useState } from 'react'
import { useToast } from '~/context'
import { sendForm } from "@emailjs/browser";
import {
  FormContent,
  FormGroup,
  Label,
  Input,
  Textarea,
  Button,
} from './styles'
import { json, useLoaderData } from '@remix-run/react';

export const loader = async () => {
  return json({ serviceId: process.env.SERVICE_ID, templateId: process.env.TEMPLATE_ID, publicKey: process.env.PUBLIC_KEY,  });
};

export const Form = () => {
  const { serviceId, publicKey, templateId } = useLoaderData<typeof loader>();
  const { setToast } = useToast();
  const [text, setText] = useState('Send');

  const sendMessage = async (
    e: BaseSyntheticEvent<Event, EventTarget & HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setText("Sending...");

      await sendForm(
        `${serviceId}`,
        `${templateId}`,
        e.target,
        `${publicKey}`
      );

      setToast(
        'Email sent :D',
        'Thanks for taking the time to write it.',
        true,
        true
      )
    } catch (e) {
      setToast(
        'Error :(',
        'Something wrong happened. Try again later.',
        true,
        false
      )
    } finally {
      setText("Send");
      e.target.reset()
    }
  }

  return (
    <FormContent onSubmit={sendMessage}>
      <FormGroup>
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          name='name'
          type="text"
          placeholder="James Bond"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          name='email'
          type="email"
          placeholder="james@bond.com"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="message">Message</Label>

        <Textarea
          id="message"
          name='message'
          placeholder="How can I help you?"
          rows={4}
          required
        />
      </FormGroup>

      <FormGroup>
        <Button type="submit">
          {text}
        </Button>
      </FormGroup>
    </FormContent>
  )
}
