import React, { useState } from 'react';

const YOGA_SEQUENCES = {
  beginner: {
    title: "🌱 Beginner Morning Flow",
    duration: "15-20 minutes",
    description: "Perfect for starting your day with gentle movement and mindful breathing",
    poses: [
      {
        id: 's1',
        title: 'Mountain Pose (Tadasana)',
        duration: '1-2 minutes',
        instructions: [
          'Stand tall with feet hip-width apart',
          'Ground down through all four corners of your feet',
          'Engage leg muscles, lengthen spine',
          'Relax shoulders away from ears',
          'Breathe deeply and find your center'
        ],
        benefits: 'Improves posture, builds grounding, enhances focus',
        img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        video: 'https://www.youtube.com/embed/v7AYKMP6rOE'
      },
      {
        id: 's2',
        title: 'Forward Fold (Uttanasana)',
        duration: '1 minute',
        instructions: [
          'Hinge at hips, bend knees slightly',
          'Let arms hang naturally',
          'Release head and neck',
          'Breathe into the back of your body',
          'Feel the gentle stretch in hamstrings'
        ],
        benefits: 'Relieves stress, stretches hamstrings, calms the mind',
        img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        video: 'https://www.youtube.com/embed/pJ7nG6Y6Y4I'
      },
      {
        id: 's3',
        title: 'Downward Facing Dog (Adho Mukha Svanasana)',
        duration: '1-2 minutes',
        instructions: [
          'From hands and knees, tuck toes',
          'Lift hips up and back',
          'Straighten legs as much as comfortable',
          'Press hands firmly into mat',
          'Pedal feet gently to warm up'
        ],
        benefits: 'Strengthens arms, stretches hamstrings, energizes body',
        img: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        video: 'https://www.youtube.com/embed/6kJ1Q0jX2UE'
      },
      {
        id: 's4',
        title: 'Warrior II (Virabhadrasana II)',
        duration: '1 minute each side',
        instructions: [
          'Step left foot back 3-4 feet',
          'Bend front knee over ankle',
          'Arms extended parallel to floor',
          'Gaze over front hand',
          'Hold with steady breath'
        ],
        benefits: 'Builds strength, improves balance, increases focus',
        img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D',
        video: 'https://www.youtube.com/embed/6c7c5bNQunQ'
      },
      {
        id: 's5',
        title: "Child's Pose (Balasana)",
        duration: '2-3 minutes',
        instructions: [
          'Kneel and sit back on heels',
          'Fold forward, arms extended or by sides',
          'Rest forehead on mat',
          'Breathe deeply into back',
          'Release and relax completely'
        ],
        benefits: 'Deeply relaxing, restores energy, soothes the nervous system',
        img: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHlvZ2F8ZW58MHx8MHx8fDA%3D',
        video: 'https://www.youtube.com/embed/Xg7zZ7qK2i0'
      }
    ]
  },
  stress_relief: {
    title: "🧘 Stress Relief Sequence",
    duration: "10-15 minutes",
    description: "Designed to release tension and calm the nervous system",
    poses: [
      {
        id: 'sr1',
        title: 'Seated Cat-Cow',
        duration: '2 minutes',
        instructions: [
          'Sit comfortably with legs crossed',
          'Inhale: arch back, lift chest',
          'Exhale: round spine, tuck chin',
          'Move slowly with your breath',
          'Feel the gentle movement in spine'
        ],
        benefits: 'Relieves back tension, improves spinal mobility',
        img: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHlvZ2F8ZW58MHx8MHx8fDA%3D',
        video: 'https://www.youtube.com/embed/8H6j6lE2w2Q'
      },
      {
        id: 'sr2',
        title: 'Easy Twist',
        duration: '1 minute each side',
        instructions: [
          'Sit cross-legged',
          'Inhale: lengthen spine',
          'Exhale: twist gently to right',
          'Left hand on right knee',
          'Hold and breathe deeply'
        ],
        benefits: 'Releases spinal tension, aids digestion, calms mind',
        img: 'https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHlvZ2F8ZW58MHx8MHx8fDA%3D',
        video: 'https://www.youtube.com/embed/v8H6j6lE2w2Q'
      },
      {
        id: 'sr3',
        title: 'Supported Forward Fold',
        duration: '3-5 minutes',
        instructions: [
          'Sit with legs extended',
          'Place bolster or pillows on thighs',
          'Fold forward over support',
          'Rest arms comfortably',
          'Breathe deeply and surrender'
        ],
        benefits: 'Deeply calming, releases hip tension, activates parasympathetic nervous system',
        img: 'https://images.unsplash.com/photo-1608405059861-b21a68ae76a2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHlvZ2F8ZW58MHx8MHx8fDA%3D',
        video: 'https://www.youtube.com/embed/w8H6j6lE2w2Q'
      }
    ]
  },
  bedtime: {
    title: "🌙 Bedtime Yoga Flow",
    duration: "10-15 minutes",
    description: "Gentle sequence to prepare your body and mind for restful sleep",
    poses: [
      {
        id: 'b1',
        title: 'Legs Up the Wall (Viparita Karani)',
        duration: '5-10 minutes',
        instructions: [
          'Sit sideways next to wall',
          'Swing legs up wall as you lie down',
          'Position hips close to wall',
          'Arms at sides, palms up',
          'Close eyes and breathe deeply'
        ],
        benefits: 'Activates relaxation response, reduces anxiety, improves circulation',
        img: 'https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHlvZ2F8ZW58MHx8MHx8fDA%3D',
        video: 'https://www.youtube.com/embed/v8H6j6lE2w2Q'
      },
      {
        id: 'b2',
        title: 'Reclining Bound Angle (Supta Baddha Konasana)',
        duration: '5 minutes',
        instructions: [
          'Lie on back',
          'Bring soles of feet together',
          'Let knees fall open',
          'Support knees with pillows if needed',
          'Rest hands on heart or belly'
        ],
        benefits: 'Opens hips, calms nervous system, prepares for sleep',
        img: 'https://images.unsplash.com/photo-1602594748821-6df031e275e1?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHlvZ2F8ZW58MHx8MHx8fDA%3D',
        video: 'https://www.youtube.com/embed/v8H6j6lE2w2Q'
      },
      {
        id: 'b3',
        title: 'Savasana (Corpse Pose)',
        duration: '5-10 minutes',
        instructions: [
          'Lie flat on back',
          'Arms slightly away from body',
          'Legs hip-width apart',
          'Close eyes and completely relax',
          'Let go of all effort'
        ],
        benefits: 'Deep relaxation, integrates practice, promotes restful sleep',
        img: 'https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHlvZ2F8ZW58MHx8MHx8fDA%3D',
        video: 'https://www.youtube.com/embed/v8H6j6lE2w2Q'
      }
    ]
  }
};

export default function Yoga() {
  const [selectedSequence, setSelectedSequence] = useState('beginner');
  const [currentPose, setCurrentPose] = useState(0);
  const sequence = YOGA_SEQUENCES[selectedSequence as keyof typeof YOGA_SEQUENCES];

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '40px 20px',
        borderRadius: '20px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🧘‍♀️</div>
        <h1 style={{ fontSize: '36px', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          Yoga for Peace & Wellness
        </h1>
        <p style={{ fontSize: '18px', margin: '0 auto', opacity: 0.9, maxWidth: '600px' }}>
          Step-by-step yoga sequences with detailed instructions, benefits, and guided videos
        </p>
      </div>

      {/* Sequence Selector */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1f2937' }}>
          Choose Your Practice
        </h2>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {Object.entries(YOGA_SEQUENCES).map(([key, seq]) => (
            <div 
              key={key}
              onClick={() => {
                setSelectedSequence(key);
                setCurrentPose(0);
              }}
              style={{
                backgroundColor: selectedSequence === key ? '#10b981' : 'white',
                color: selectedSequence === key ? 'white' : '#374151',
                border: `2px solid ${selectedSequence === key ? '#10b981' : '#e5e7eb'}`,
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: selectedSequence === key ? 'scale(1.02)' : 'scale(1)',
                boxShadow: selectedSequence === key ? '0 8px 25px rgba(16, 185, 129, 0.3)' : '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ margin: '0 0 12px 0', fontSize: '20px' }}>{seq.title}</h3>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>
                ⏱️ {seq.duration}
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                {seq.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Sequence */}
      {sequence && (
        <div>
          <div style={{ 
            backgroundColor: '#f0f9ff', 
            borderRadius: '16px', 
            padding: '24px',
            marginBottom: '30px',
            border: '2px solid #0ea5e9'
          }}>
            <h2 style={{ margin: '0 0 16px 0', color: '#0c4a6e' }}>
              {sequence.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
              <div style={{ 
                backgroundColor: '#0ea5e9', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                ⏱️ {sequence.duration}
              </div>
              <div style={{ color: '#0c4a6e', fontSize: '14px' }}>
                Pose {currentPose + 1} of {sequence.poses.length}
              </div>
            </div>
            <p style={{ margin: 0, color: '#0c4a6e' }}>
              {sequence.description}
            </p>
          </div>

          {/* Pose Navigation */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '30px',
            overflowX: 'auto',
            paddingBottom: '8px'
          }}>
            {sequence.poses.map((pose, index) => (
              <button
                key={pose.id}
                onClick={() => setCurrentPose(index)}
                style={{
                  backgroundColor: currentPose === index ? '#10b981' : '#f3f4f6',
                  color: currentPose === index ? 'white' : '#374151',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {index + 1}. {pose.title.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Current Pose */}
          {sequence.poses[currentPose] && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Pose Image and Video */}
                <div>
                  <img 
                    src={sequence.poses[currentPose].img} 
                    alt={sequence.poses[currentPose].title}
                    style={{ 
                      width: '100%', 
                      height: '250px', 
                      objectFit: 'cover', 
                      borderRadius: '12px',
                      marginBottom: '16px'
                    }}
                  />
                  <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                      title={sequence.poses[currentPose].title}
                      src={sequence.poses[currentPose].video}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: '12px'
                      }}
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Pose Details */}
                <div>
                  <h3 style={{ margin: '0 0 12px 0', color: '#1f2937', fontSize: '24px' }}>
                    {sequence.poses[currentPose].title}
                  </h3>
                  
                  <div style={{ 
                    backgroundColor: '#10b981', 
                    color: 'white', 
                    padding: '6px 12px', 
                    borderRadius: '20px',
                    fontSize: '14px',
                    display: 'inline-block',
                    marginBottom: '16px'
                  }}>
                    ⏱️ {sequence.poses[currentPose].duration}
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#374151' }}>
                      📋 Step-by-Step Instructions
                    </h4>
                    <ol style={{ margin: 0, paddingLeft: '20px', color: '#6b7280' }}>
                      {sequence.poses[currentPose].instructions.map((instruction, index) => (
                        <li key={index} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div style={{
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #22c55e'
                  }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#15803d' }}>
                      ✨ Benefits
                    </h4>
                    <p style={{ margin: 0, color: '#15803d', fontSize: '14px' }}>
                      {sequence.poses[currentPose].benefits}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentPose(Math.max(0, currentPose - 1))}
              disabled={currentPose === 0}
              style={{
                backgroundColor: currentPose === 0 ? '#f3f4f6' : '#10b981',
                color: currentPose === 0 ? '#9ca3af' : 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: currentPose === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ← Previous Pose
            </button>

            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <div style={{ fontSize: '14px' }}>
                Pose {currentPose + 1} of {sequence.poses.length}
              </div>
              <div style={{ 
                width: '200px', 
                height: '6px', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '3px',
                margin: '8px auto'
              }}>
                <div style={{
                  width: `${((currentPose + 1) / sequence.poses.length) * 100}%`,
                  height: '100%',
                  backgroundColor: '#10b981',
                  borderRadius: '3px',
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>

            <button
              onClick={() => setCurrentPose(Math.min(sequence.poses.length - 1, currentPose + 1))}
              disabled={currentPose === sequence.poses.length - 1}
              style={{
                backgroundColor: currentPose === sequence.poses.length - 1 ? '#f3f4f6' : '#10b981',
                color: currentPose === sequence.poses.length - 1 ? '#9ca3af' : 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: currentPose === sequence.poses.length - 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Next Pose →
            </button>
          </div>
        </div>
      )}

      {/* Free YouTube Videos Section */}
      <div style={{
        marginTop: '40px',
        backgroundColor: '#f0fdf4',
        borderRadius: '16px',
        padding: '24px',
        border: '2px solid #22c55e'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#15803d' }}>
          🧘 Yoga Videos — Free & Beginner-Friendly
        </h3>
        <p style={{ margin: '0 0 20px 0', color: '#15803d', fontSize: '16px' }}>
          Enhance your practice with these curated free yoga videos from popular instructors.
        </p>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #22c55e'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#15803d' }}>
              10-Minute Yoga for Beginners
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '14px' }}>
              Great basic yoga sequence for stress, focus, and wellness.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" 
              alt="10-Minute Yoga for Beginners"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
            />
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '12px' }}>
              <iframe
                src="https://www.youtube.com/embed/j7rKKpwdXNE"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                allowFullScreen
                title="10-Minute Yoga for Beginners"
              />
            </div>
            <a 
              href="https://www.youtube.com/watch?v=j7rKKpwdXNE" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              ▶️ Watch on YouTube
            </a>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #22c55e'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#15803d' }}>
              Yoga With Adriene
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '14px' }}>
              Huge library of free yoga videos from a popular instructor (beginners to advanced).
            </p>
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" 
              alt="Yoga With Adriene"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
            />
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '12px' }}>
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLui6Eyny-UzzFFfpiil94CUrjVMwaY6NG"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                allowFullScreen
                title="Yoga With Adriene"
              />
            </div>
            <a 
              href="https://www.youtube.com/yogawithadriene" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              ▶️ Visit Channel
            </a>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #22c55e'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#15803d' }}>
              30 Minute Yoga Sequence
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '14px' }}>
              A playlist of longer flows you can link to.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop" 
              alt="30 Minute Yoga Sequence"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
            />
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '12px' }}>
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLPJTnhnYa-pNJlj1W_wKkpqwx7Ksi5lhl"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                allowFullScreen
                title="30 Minute Yoga Sequence Playlist"
              />
            </div>
            <a 
              href="https://www.youtube.com/playlist?list=PLPJTnhnYa-pNJlj1W_wKkpqwx7Ksi5lhl" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              ▶️ View Playlist
            </a>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #22c55e'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#15803d' }}>
              Restorative Yoga + Meditation
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '14px' }}>
              Slow, calming yoga + meditation flow (35-minute).
            </p>
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop" 
              alt="Restorative Yoga + Meditation"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
            />
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '12px' }}>
              <iframe
                src="https://www.youtube.com/embed/rrLkhg3fA0M"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                allowFullScreen
                title="Restorative Yoga + Meditation"
              />
            </div>
            <a 
              href="https://www.youtube.com/watch?v=rrLkhg3fA0M" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              ▶️ Watch on YouTube
            </a>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          border: '1px solid #f59e0b'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>🔍 Tip</h4>
          <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
            If you need downloadable royalty-free yoga clips (for in-app use e.g., backgrounds or demos), 
            sites like <a href="https://pixabay.com/videos/" target="_blank" rel="noreferrer" style={{ color: '#dc2626' }}>Pixabay</a> offer thousands of free yoga stock videos 
            (no YouTube embed required).
          </p>
        </div>
      </div>

      {/* VR/360° Videos Section */}
      <div style={{
        marginTop: '40px',
        backgroundColor: '#f0f9ff',
        borderRadius: '16px',
        padding: '24px',
        border: '2px solid #0ea5e9'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#0c4a6e' }}>
          🕶️ VR / 360° Videos — Free & Immersive
        </h3>
        <p style={{ margin: '0 0 20px 0', color: '#0c4a6e', fontSize: '16px' }}>
          Note: For best experience, view fullscreen or in a 360° capable player/mobile.
        </p>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #0ea5e9'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0c4a6e' }}>
              360° Morning Walk in Nature
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#0369a1', fontSize: '14px' }}>
              A relaxing nature walk environment in 360° you can embed.
            </p>
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '12px' }}>
              <iframe
                src="https://www.youtube.com/embed/4rrAkC-8vzs"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                allowFullScreen
                title="360° Morning Walk in Nature"
              />
            </div>
            <a 
              href="https://www.youtube.com/watch?v=4rrAkC-8vzs" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              ▶️ Watch on YouTube
            </a>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #0ea5e9'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0c4a6e' }}>
              📺 360° VR Video Playlists
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#0369a1', fontSize: '14px' }}>
              360 VR Videos Playlist — Nature & Immersive Content
            </p>
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '12px' }}>
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLSbEbRoGC_hqyKwJbiOCG1tWj9kGBJNEf"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                allowFullScreen
                title="360 VR Videos Playlist"
              />
            </div>
            <a 
              href="https://www.youtube.com/playlist?list=PLSbEbRoGC_hqyKwJbiOCG1tWj9kGBJNEf" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              ▶️ View Playlist
            </a>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #0ea5e9'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0c4a6e' }}>
              Virtual Reality 360 Video Channel
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#0369a1', fontSize: '14px' }}>
              General VR 360 videos — useful for relaxing backgrounds.
            </p>
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '12px' }}>
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLcyfIKhQZ_gZdZFJY1V50q4GXRUwphKxh"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                allowFullScreen
                title="Virtual Reality 360 Video Channel"
              />
            </div>
            <a 
              href="https://www.youtube.com/@virtualreality360videochan5" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              ▶️ Visit Channel
            </a>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #0ea5e9'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0c4a6e' }}>
              Another 360 VR Playlist
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#0369a1', fontSize: '14px' }}>
              Includes VR tours and environments you might link in.
            </p>
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '12px' }}>
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLcyfIKhQZ_gZdZFJY1V50q4GXRUwphKxh"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                allowFullScreen
                title="Another 360 VR Playlist"
              />
            </div>
            <a 
              href="https://www.youtube.com/playlist?list=PLcyfIKhQZ_gZdZFJY1V50q4GXRUwphKxh" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              ▶️ View Playlist
            </a>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          border: '1px solid #f59e0b'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>📺 Note</h4>
          <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
            For best experience with 360° content, view fullscreen or in a 360° capable player/mobile device.
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <div style={{
        marginTop: '40px',
        backgroundColor: '#fef3c7',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #f59e0b'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#92400e' }}>
          💡 Yoga Practice Tips
        </h3>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>🫁 Breath</h4>
            <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
              Never hold your breath. Breathe deeply and steadily throughout each pose.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>🎯 Alignment</h4>
            <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
              Focus on proper alignment over depth. Quality over quantity in each pose.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>⏸️ Rest</h4>
            <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
              Listen to your body. Take breaks in Child's Pose whenever needed.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>🧘‍♀️ Mindfulness</h4>
            <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
              Stay present and mindful. This is your time for self-care and reflection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
