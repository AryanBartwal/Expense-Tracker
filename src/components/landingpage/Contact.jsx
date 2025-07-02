import { useState } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Alert,
  Fade
} from "@mui/material";
import { 
  Email, 
  Phone, 
  LocationOn, 
  Send 
} from "@mui/icons-material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Contact form submitted:", formData);
    
    // Show success message
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}
        >
          📞 Get in Touch
        </Typography>
        
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            mb: 6,
            fontSize: { xs: "1rem", sm: "1.2rem" }
          }}
        >
          We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </Typography>

        {success && (
          <Fade in={success}>
            <Alert 
              severity="success" 
              sx={{ 
                mb: 4, 
                borderRadius: 2,
                "& .MuiAlert-message": {
                  fontSize: "1.1rem"
                }
              }}
            >
              🎉 Thank you! Your message has been sent successfully. We&apos;ll get back to you soon!
            </Alert>
          </Fade>
        )}

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 4,
                  fontSize: { xs: "1.8rem", sm: "2.2rem" }
                }}
              >
                Contact Information
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Email sx={{ color: "white", fontSize: 28 }} />
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                        Email
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                      aryanbartwal13@gmail.com
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Phone sx={{ color: "white", fontSize: 28 }} />
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                        Phone
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                      +91 8630554769
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <LocationOn sx={{ color: "white", fontSize: 28 }} />
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                        Available Online
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                      Remote Services Worldwide
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: 4,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                    mb: 3,
                    textAlign: "center"
                  }}
                >
                  Send us a Message
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={6}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        fullWidth
                        sx={{
                          background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                          color: "white",
                          borderRadius: 2,
                          py: 1.5,
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          textTransform: "none",
                          "&:hover": {
                            background: "linear-gradient(45deg, #5a6fd8 30%, #6a42a0 90%)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
