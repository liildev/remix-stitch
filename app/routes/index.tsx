import type { MetaFunction } from "@remix-run/node";
import { Layout, Shortcut } from "~/modules";

export const meta: MetaFunction = () => {
  return [
    { title: "Mansourov Nazim" },
    { name: "description", content: "Obsessed with developer experience" },
    { name: 'image', content: '/images/ld.jpg' }
  ];
};

export default function Page() {
  return (
    <Layout title='Mansourov Nazim'>
      <p>
        <strong>Software Developer</strong>

        <br />

        Obsessed with developer experience
      </p>

      <Shortcut />
    </Layout>
  );
}
