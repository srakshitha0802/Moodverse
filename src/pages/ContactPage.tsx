import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px 20px',
        borderRadius: '20px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📞</div>
        <h1 style={{ fontSize: '36px', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          Contact Moodverse
        </h1>
        <p style={{ fontSize: '18px', margin: '0 auto', opacity: 0.9, maxWidth: '600px' }}>
          Get in touch with our team for support, partnerships, or just to say hello
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
        {/* Contact Information */}
        <div>
          <h2 style={{ color: '#1f2937', marginBottom: '24px' }}>Get in Touch</h2>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#374151' }}>👤 Developer Contact</h3>
            <div style={{ color: '#6b7280', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ marginRight: '12px', fontSize: '20px' }}>👩‍💻</span>
                <div>
                  <strong>Semala Rakshitha</strong><br/>
                  Lead Developer & Founder
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ marginRight: '12px', fontSize: '20px' }}>📱</span>
                <div>
                  <strong>Phone:</strong> +91 8639975744
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ marginRight: '12px', fontSize: '20px' }}>📧</span>
                <div>
                  <strong>Email:</strong> rakshithasemala@gmail.com
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '12px', fontSize: '20px' }}>🌐</span>
                <div>
                  <strong>Website:</strong> moodverse.com
                </div>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f0f9ff',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid #0ea5e9'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#0c4a6e' }}>🆘 Emergency Resources</h3>
            <div style={{ color: '#0c4a6e', lineHeight: '1.8' }}>
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#dc2626' }}>🚨 Crisis Helplines (24/7):</strong>
              </div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                • <strong>National Suicide Prevention Lifeline:</strong> 988
              </div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                • <strong>Crisis Text Line:</strong> Text HOME to 741741
              </div>
              <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                • <strong>Emergency:</strong> 911
              </div>
              <div style={{ fontSize: '12px', color: '#0369a1', fontStyle: 'italic' }}>
                If you're in immediate danger, please call emergency services immediately.
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#fef3c7',
            borderRadius: '16px',
            padding: '20px',
            marginTop: '20px',
            border: '1px solid #f59e0b'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>💬 Support Hours</h4>
            <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
              We typically respond to messages within 24-48 hours. For urgent mental health concerns, please use the crisis resources above.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 style={{ color: '#1f2937', marginBottom: '24px' }}>Send us a Message</h2>
          
          <form onSubmit={handleSubmit} style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your full name"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your email address"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              >
                <option value="">Select a subject</option>
                <option value="support">Technical Support</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="feedback">Feedback & Suggestions</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              📤 Send Message
            </button>
          </form>

          <div style={{
            backgroundColor: '#f0fdf4',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '20px',
            border: '1px solid #22c55e'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ marginRight: '8px' }}>🔒</span>
              <strong style={{ color: '#15803d' }}>Privacy Protected</strong>
            </div>
            <p style={{ margin: 0, color: '#15803d', fontSize: '14px' }}>
              Your message and contact information are secure and will only be used to respond to your inquiry.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '40px'
      }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 32px 0', color: '#1f2937' }}>
          Frequently Asked Questions
        </h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>❓ Is Moodverse free to use?</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              Yes! Moodverse is completely free to use. We believe everyone deserves access to mental wellness tools.
            </p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>🔒 How is my data protected?</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              We use privacy-first design with local processing. Your data is never stored on our servers without explicit consent.
            </p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>🤖 Can AI replace therapy?</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              No, Moodverse is a wellness tool, not a replacement for professional mental health care. Always consult qualified professionals.
            </p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>🌟 How can I contribute?</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              We'd love your feedback! Share suggestions, report bugs, or reach out about partnership opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
