import UuidGenerator from "./uuidGenerator";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UUID Generator Online - Generate UUID v1, v4, v7 | Free Tool',
    description: 'Free online UUID generator. Generate random UUIDs in version 1, 4, and 7 formats. Copy single or multiple UUIDs instantly. No signup required.',
    keywords: ['UUID', 'GUID', 'UUID Generator', 'UUID v1', 'UUID v4', 'UUID v7', 'v1', 'v4', 'v7', 'random UUID', 'Learn UUID', 'online UUID',
        'free UUID', 'free UUID generator', 'bulk UUID', 'bulk UUID generator', 'Study UUID', 'GUID generator', 'online uuid', 'developer tools'],
    robots: { index: true, follow: true },
    openGraph: {
        title: 'UUID Generator Online - Generate UUID v1, v4, v7 | Free Tool',
        description: 'Free online UUID generator. Generate random UUIDs in version 1, 4, and 7 formats.',
        images: [
            {
                url: '/assets/android-chrome-512x512.png',
                width: 512,
                height: 512,
                alt: 'UUID Generator Online - Generate UUID v1, v4, v7 | Free Tool',
            },
        ],
        type: 'website',
        url: 'https://mybittools.com/uuid-generator',
    },
    alternates: {
        canonical: '/uuid-generator',
    },
};

export default function UuidGeneratorPage() {
    return (
        <div className="main-content-container">
            <header>
                <h1 className="title">Free Online UUID Generator (v1, v4, v7)</h1>
                <p className="description">
                    Welcome to our free online UUID generator. <br />Generate random UUIDs (v1, v4, or v7) — one or many at a time.
                    <span className="max-count">(50 at max)</span>
                </p>
            </header>
            <main>
                <article>
                    <section>
                        <h2>Generate new UUIDs</h2>
                        <p>Fill out the form below to choose how many UUIDs you want to generate and which version to use.</p>
                    </section>
                    <UuidGenerator />

                    {/* <!--learning section start here--> */}
                    {/* <!--section 1 what is uuid--> */}
                    <section className="learning-section_article-container">
                        <h2>What Is a UUID?</h2>
                        <p className="learning-section_introduction font-weight-light font-size-large">
                            A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems, often seen as a 32-character hexadecimal string (e.g.,
                            123e4567-e89b-12d3-a456-426614174000), serving as a reliable, system-agnostic ID for database records, objects, or sessions, with an extremely low chance of duplication,
                            eliminating the need for a central authority.
                        </p>
                        <h3>Key Characteristics of a UUID:</h3>
                        <ul className="learning-section_list">
                            <li><strong>128-bit Value:</strong> A UUID represents a 128-bit number, providing a vast range of possible unique values (over 340 undecillion).</li>
                            <li><strong>Format:</strong> Typically displayed as 32 hexadecimal digits, grouped into five sections separated by hyphens (8-4-4-4-12).</li>
                            <li>
                                <strong>Uniqueness:</strong> Designed to be unique across all systems and time, making it ideal for distributed environments where different systems generate IDs
                                independently.
                            </li>
                            <li><strong>No Central Authority:</strong> Can be generated locally by any system, avoiding bottlenecks and coordination issues.</li>
                            <li><strong>Also Known As:</strong> Often called a GUID (Globally Unique Identifier), especially in Microsoft environments.</li>
                        </ul>
                        <h3>Common Uses of UUIDs:</h3>
                        <ul className="learning-section_list">
                            <li><strong>Database Keys:</strong> Used as primary keys for database rows, allowing for distributed data management.</li>
                            <li><strong>Object Identification:</strong> Uniquely tagging digital assets like files, users, or sessions.</li>
                            <li><strong>Session & Device Tracking:</strong> Managing user sessions or identifying devices in applications without relying on hardware details.</li>
                        </ul>
                        <h3>UUID Versions Explained (v1 vs v4 vs v7)</h3>
                        <p>Our generator supports the most popular versions:</p>
                        <ul className="learning-section_list">
                            <li><strong>UUID v4 (Random):</strong> The most common version. It uses random numbers to ensure uniqueness. Perfect for general use.</li>
                            <li>
                                <strong>UUID v7 (Time-ordered):</strong> A newer standard that includes a timestamp. It is <strong>sortable</strong>, making it excellent for database primary keys
                                compared to v4.
                            </li>
                            <li><strong>UUID v1 (Timestamp + MAC):</strong> Generates IDs based on the current time and the machine&apos;s MAC address.</li>
                        </ul>
                        <h3>UUID Example:</h3>
                        <code>a1b2c3d4-e5f6-7890-1234-567890abcdef</code>
                    </section>
                </article>
            </main>
        </div>
    );
}